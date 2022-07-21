export const Link = (props) => {
  console.log(props)
  const h = () => {}

  return (
    <div class="p-1 w" onClick={h}>
      code: {props.link.code}
    </div>
  )
}
