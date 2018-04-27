/**
 * cookie相关操作对象
 * @type {{}}
 */
export default {
  set ({key, value, path, expires}) {
    document.cookie = `${key}=${value};path=${path || '/'};`
  },
  get (key) {
    if (key && new RegExp('(^| )' + key + '=([^;]*)(;|$)').exec(document.cookie)) {
      return decodeURIComponent(RegExp.$2)
    } else {
      return null
    }
  },
  remove (key, path, domain) {
    let keys = key
    let forPath = ';path=' + (path || '/')
    forPath += domain ? ';domain=' + domain : ''
    if (key) {
      if (!Array.isArray(key)) {
        keys = [key]
      }
    } else {
      keys = document.cookie.match(/(?!\s)([^;=]+)(?==.*(;|$))/g)
    }
    keys.forEach(function (item, index) {
      document.cookie = item + '= ; expires=' + new Date(0) + forPath
    })
  }
}
