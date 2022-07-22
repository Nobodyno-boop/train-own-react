import { Alert } from '../cp/Alert'
import { Input } from '../cp/Input'
import { Links } from '../cp/Links'
import { Page } from '../cp/Page'

/**/

export const Index = (props) => {
  return (
    <Page>
      <Alert />
      <h1 class="m-11 text-9xl font-extrabold text-transparent uppercase tracking-tighest bg-gradient-to-r bg-conic-to-t from-white to-indigo-500 bg-clip-text">
        ShortU
      </h1>
      <div class="w-150 h-40 rounded bg-gray-900 text-white p-4 text-center flex flex-col drop-shadow-lg">
        <div class="font-bold font-mono text-lg">Crée votre lien coupé !</div>
        <Input />
      </div>
      <div class="w-150 rounded bg-gray-900 text-white p-4 text-center flex flex-col drop-shadow-lg">
        <div class="font-bold font-mono text-lg">Listes de vos liens</div>
        <div>
          <Links />
        </div>
      </div>
      <div class="w-150 h-20 rounded bg-gray-900 text-white p-4 text-center flex justify-center	  drop-shadow-lg">
        <a href="https://github.com/Nobodyno-boop/train-own-react">
          <img class="w-10 h-10" src="github.png" alt="" />
        </a>
      </div>
    </Page>
  )
}
