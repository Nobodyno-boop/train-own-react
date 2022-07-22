export const Page = (props, childs) => {
  return (
    <div class="min-h-screen min-w-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex flex-col space-y-10 items-center ">
      {childs}
    </div>
  )
}
