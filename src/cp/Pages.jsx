import { useSignal, reresh } from '../utils/signal'

export const Pages = (props, ...childs) => {
  let current = (props.current || props.default) ?? ''
  console.log(props)
  let page = props.childs.find((x) => x.name === current)
  useSignal.on('changePage', (name) => {
    reresh({ ...props, current: name })
  })

  return (
    <div p="2" _id={props.id}>
      {page()}
    </div>
  )
}
