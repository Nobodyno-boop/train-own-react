import { Input } from './Input'
import { Links } from './Links'

export const Page = (props, childs) => {
  return (
    <div class="h-screen w-screen bg-gray-900 flex flex-col space-y-4 items-center justify-center">
      {childs}
    </div>
  )
}
