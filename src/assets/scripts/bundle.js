import {render} from 'react-dom'

import './../styles/site.scss'
import router from './../../routes/index.jsx'

global.startPSz = () => {
  // Developer signature
  console.log('Hi, Mom!')
  const appContainer = global.document.getElementById('site')
  render(router, appContainer)
}
