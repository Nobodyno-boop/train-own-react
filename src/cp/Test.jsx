import { useState } from '../utils/state'
import { Page } from './page'

export const Test = (props) => {
  let [count, setCount] = useState(0)

  return (
    <Page>
      <h1>Hey</h1>
      <h2>{count}</h2>
    </Page>
  )
}
