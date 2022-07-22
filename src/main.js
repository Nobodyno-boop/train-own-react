import 'virtual:windi.css'
import '../style.css'

import { Fr } from '../bin/freak'
import { Index } from './pages/Index'

window.Fr = Fr

const dispose = () => {
  Fr.render(Index, document.getElementById('app'))
}

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(dispose)
}

dispose()
