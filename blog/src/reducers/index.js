import { combineReducers } from 'redux'
import { syncHistory, routeReducer } from 'redux-simple-router'
import todos from './todos'

const rootReducer = combineReducers({
  todos,
  routeReducer
})

export default rootReducer