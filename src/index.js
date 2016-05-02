import React from 'react';
import domReady from 'domready';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import routes from './routes/routes.jsx';
import reducer from './reducers/index.js';

import './assets/styles/site.scss';

function getInitialState() {
  if (process.env.NODE_ENV === 'development') {
    return {};
  }
  let stateFromServer = window.__STATE_FROM_SERVER__;
  if (!stateFromServer) {return {};}
  try {
    let postHtmlTemplate = document.getElementById('post-html-template');
    let html = postHtmlTemplate.innerHTML;
    let slug = postHtmlTemplate.getAttribute('data-post-slug');
    stateFromServer.entities.posts.bySlug[slug].data.html = html;
    return stateFromServer;
  } catch(err) {
    stateFromServer = {};
  }
  return stateFromServer;
}

domReady(() => {
  // Developer signature
  console.log('Hi, Mom!');

  require('babel-polyfill');
  require('whatwg-fetch');

  const store = createStore(reducer, getInitialState());

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
