import { getLinks, addLinks } from '../utils/store'
import { useSignal } from '../utils/signal'

import { useMap, useState } from '../utils/state'
import { Link } from './Link'

export const Links = () => {
  let _links = getLinks()
  const [link, setLinks] = useState(_links)

  useSignal.on('link:add', (data) => {
    console.log(data)
    if (data?.result) {
      addLinks(data.result)
      setLinks(getLinks())
    }
  })
  const f = () => {
    setLinks([...link(), { code: 'aaa' }])
  }

  return (
    <div>
      <button onClick={f}>add</button>
      <div class="flex flex-col flex-2">
        {useMap(
          (link) =>
            link.map((x) => {
              return <Link link={x} />
            }),
          link
        )}
      </div>
    </div>
  )
}
