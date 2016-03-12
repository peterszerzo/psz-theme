import {combineReducers} from 'redux'

import postEntitiesReducer from './posts.js'

export default combineReducers({
  posts: postEntitiesReducer
})
