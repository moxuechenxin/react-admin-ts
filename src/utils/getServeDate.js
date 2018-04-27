/**
 * 获取服务器时间
 * @param serveUrl: 服务器地址
 * @returns {{}}
 */
export default (serveUrl) => {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.open('get', serveUrl || '/', true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 3) {
        let now = xhr.getResponseHeader('Date')
        now = now || new Date()
        resolve(new Date(now).getTime())
        xhr.abort()
      }
    }
    xhr.onerror = function (err) {
      reject(err)
    }
    xhr.send(null)
  })
}
