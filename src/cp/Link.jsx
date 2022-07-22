import { useSignal } from '../utils/signal'

export const Link = (props) => {
  const h = () => {}
  const _copy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      useSignal.emit(
        'alert:message',
        'Votre lien a été copier dans votre presse-papier'
      )
    })
  }
  const copy1 = () => {
    _copy(props.link.full_short_link)
  }
  const copy2 = () => {
    _copy(props.link.full_short_link2)
  }
  const copy3 = () => {
    _copy(props.link.full_short_link3)
  }
  return (
    <div
      class="p-1 rounded-sm w-50 h-25 m-1 bg-gray-900 text-white shadow-lg"
      onClick={h}
    >
      <div>
        code :{' '}
        <span class="underline  font-bold decoration-indigo-500	">
          {props.link.code}
        </span>
      </div>

      <div class="has-tooltip flex-none">
        <div class="truncate">{props.link.original_link}</div>
        <span class="tooltip rounded shadow-lg p-1 bg-indigo-500 text-white -mt-8 left-auto">
          {props.link.original_link}
        </span>
      </div>

      <div class="mt-4 inline-flex space-x-3">
        <div
          onClick={copy1}
          class="text-indigo-500 font-bold hover:underline cursor-pointer"
        >
          Lien 1
        </div>
        <div
          onClick={copy2}
          class="text-indigo-500 font-bold hover:underline cursor-pointer"
        >
          Lien 2
        </div>
        <div
          onClick={copy3}
          class="text-indigo-500 font-bold hover:underline cursor-pointer"
        >
          Lien 3
        </div>
      </div>
    </div>
  )
}
