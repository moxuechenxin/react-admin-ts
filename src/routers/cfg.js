// 引入所有模块的router.js配置文件
function importAllRouter (r) {
  return r.keys().reduce((prev, curr, index) => {
    return prev.concat(r(curr).default.concat())
  }, [])
}
const allRouters = importAllRouter(require.context('@/components/', true, /router\.js$/))

console.log('allRouters', allRouters)
export default allRouters
