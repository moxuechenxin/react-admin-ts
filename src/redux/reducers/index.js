import { combineReducers } from 'redux'

const requireCtx = require.context('./', false, /\.js$/)
const modules = requireCtx
  .keys()
  .filter(relPath => !relPath.match(/index\.js$/)) // 忽略index.js
  .map(relPath => {
    const filename = relPath.match(/\/?([\w]+.js)$/)[1]
    return {
      name: filename.slice(0, -3),
      exports: requireCtx(relPath).default
    }
  })

export default combineReducers({
  ...(() => {
    const reducers = {}
    modules.forEach(module => {
      reducers[module.name] = module.exports
    })
    return reducers
  })()
})