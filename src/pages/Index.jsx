import { Input } from '../cp/Input'
import { Links } from '../cp/Links'
import { Page } from '../cp/Page'

/**/

export const Index = (props) => {
  return (
    <Page>
      <div class="w-150 h-40 rounded bg-light-700 p-4 text-center flex flex-col">
        <div class="font-bold font-mono text-lg">Crée votre lien coupé !</div>
        <Input />
      </div>
      <div class="w-150 rounded bg-light-700 p-4 text-center flex flex-col">
        <div class="font-bold font-mono text-lg">Listes de vos liens</div>
        <div>
          <Links />
        </div>
      </div>
    </Page>
  )
}
