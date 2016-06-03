import React from 'react';
import domReady from 'domready';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {getLocalPathname} from 'local-links';

import {setWindowDimensions} from './actions/ui.js';

import {setUrl} from './actions/url.js';
import reducer from './reducers/index.js';

import Layout from './containers/layout.jsx';

import './styles/site.scss';

function getInitialUiState() {
  return {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    scrollTop: 0,
    scrollDirection: 'up',
    loadedImages: []
  };
}

function getInitialUrlState() {
  return location.pathname;
}

function getInitialPostsState() {
  try {
    const postsState = window.__STATE_FROM_SERVER__.posts;
    let postHtmlTemplate = document.getElementById('post-html-template');
    let html = postHtmlTemplate.innerHTML;
    let slug = postHtmlTemplate.getAttribute('data-post-slug');
    postsState.bySlug[slug].data.html = html;
    return postsState;
  } catch(err) {
    return {
      bySlug: {},
      summaries: {
        status: 'empty'
      }
    };
  }
}

function getInitialState() {
  return {
    url: getInitialUrlState(),
    ui: getInitialUiState(),
    posts: getInitialPostsState()
  };
}

domReady(() => {
  // Developer signature
  console.log('Hi, Mom!');

  require('babel-polyfill');
  require('whatwg-fetch');

  const store = createStore(reducer, getInitialState(), applyMiddleware(thunkMiddleware));

  window.addEventListener('popstate', () => {
    store.dispatch(setUrl(location.pathname));
  });

  window.addEventListener('resize', () => {
    store.dispatch(setWindowDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    }));
  });

  document.body.addEventListener('click', (event) => {
    const url = getLocalPathname(event);
    if (url) {
      event.preventDefault();
      store.dispatch(setUrl(url));
    }
    if (location.pathname !== store.getState().url) {
      history.pushState(null, null, url);
    }
  });

  render((
    <Provider store={store}>
      <Layout/>
    </Provider>
  ), document.getElementById('site'));
});
