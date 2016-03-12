import {combineReducers} from 'redux'

import uiReducer from './ui'
import entitiesReducer from './entities/index'

export default combineReducers({
  ui: uiReducer,
  entities: entitiesReducer
})
