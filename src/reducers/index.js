import {combineReducers} from 'redux';

import ui from './ui.js';
import posts from './posts.js';
import url from './url.js';

export default combineReducers({
  ui,
  posts,
  url
});
