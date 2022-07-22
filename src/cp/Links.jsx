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
      <div class="flex flex-auto flex-wrap content-between place-content-center	">
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
