import { resolve } from 'path'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import glob from 'glob-promise/lib/node7'

export default async (basePath) => {
  
  // http://www.globtester.com/
  const reducers = await glob('**/app/**/+(reducer).js', { cwd: basePath })
  const search = /src\/app\/(\w+)\/reducer\.js|src\/(app)\/reducer\.js/
  const combined = {
    routing: routerReducer
  }

  for (const r of reducers) {
    const reducer = require(resolve(basePath, r)).default
    const name = r.match(search)[1] ? r.match(search)[1] : r.match(search)[2]
    if (name === 'app') {
      for(const n in reducer) {
        combined[n] = reducer[n]
      }
    } else {
      combined[name] = reducer
    }
  }
  
  return combineReducers(combined)

}