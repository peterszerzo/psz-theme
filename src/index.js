import {render} from 'react-dom';
import {polyfill} from 'es6-promise';

import './assets/styles/site.scss';
import router from './routes/index.jsx';

global.startPSz = () => {
  // Developer signature
  console.log('Hi, Mom!');
  polyfill();
  require('whatwg-fetch');
  const appContainer = global.document.getElementById('site');
  render(router, appContainer);
};
