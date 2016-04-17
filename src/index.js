import React from 'react';
import domReady from 'domready';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import routes from './routes/routes.jsx';
import reducer from './reducers/index.js';

import './assets/styles/site.scss';

domReady(() => {
  // Developer signature
  console.log('Hi, Mom!');

  require('babel-polyfill');
  require('whatwg-fetch');

  const store = createStore(reducer, window.__STATE_FROM_SERVER__);

  const reduxRouter = (
    <Provider store={store}>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </Provider>
  );

  const node = global.document.getElementById('site');
  render(reduxRouter, node);
});
