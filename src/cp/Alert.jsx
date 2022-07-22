import { useSignal } from '../utils/signal'
import { useContext, useState } from '../utils/state'

export const Alert = (props) => {
  const [state, setState] = useState(false)
  const [msg, setMsg] = useState('')
  useSignal.on('alert:message', (msg) => {
    setMsg(msg)
    setState(true)

    setTimeout(() => {
      setState(false)
    }, 1000 * 3)
  })
  return (
    <div>
      {useContext(
        (state, msg) => {
          if (state) {
            return (
              <div
                class="fade-in p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg "
                role="alert"
              >
                <span class="font-medium">Info</span> {msg}
              </div>
            )
          } else
            return (
              <div
                class="invisible fade-in p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg "
                role="alert"
              >
                <span class="font-medium">Info</span> {msg}
              </div>
            )
        },
        state,
        msg
      )}
    </div>
  )
}
