import { createStore } from 'redux'
import reducers from './reducers/index'

/* eslint-disable no-underscore-dangle */
export default createStore(reducers, /* preloadedState, */
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
/* eslint-enable */