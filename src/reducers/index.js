import {combineReducers} from 'redux';

import ui from './ui.js';
import posts from './posts.js';

export default combineReducers({
  ui,
  posts
});
