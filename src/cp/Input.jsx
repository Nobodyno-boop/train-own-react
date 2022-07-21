import { useSignal } from '../utils/signal'
import { useState } from '../utils/state'
import { create } from '../utils/api'

export const Input = (props) => {
  const [url, setUrl] = useState('')

  const change = (e) => {
    setUrl(e.target.value)
  }

  const click = async () => {
    await create(url(), (data) => {
      if (data?.error_code) {
        console.log('HAndle error here')
      } else {
        useSignal.emit('link:add', data)
      }
    })
  }

  return (
    <div class="mt-1">
      <input
        placeholder="https://votreurl.com"
        onChange={change}
        class="px-3 py-2 w-full bg-gray-50 text-gray-700 border focus:ring ring-indigo-300 rounded outline-none transition duration-100"
        value={url}
      />
      <button
        onClick={click}
        class="mt-2 inline-block font-bold bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
      >
        Crée
      </button>
    </div>
  )
}
