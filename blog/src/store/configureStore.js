import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { syncHistory } from 'redux-simple-router'
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'

export default function configureStore (history, initialState) {
  
  // sync redux with react-router
  const reduxRouterMiddleware = syncHistory(history)

  // apply middleware
  const middleware = applyMiddleware(
    thunk,
    reduxRouterMiddleware
  )
  
  // compose middleware
  let createStoreWithMiddleware = compose(middleware)
  
  // create store with middleware
  const store = createStoreWithMiddleware(createStore)(
    rootReducer,
    initialState
  )

  // set up hmr
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}