import { Component } from 'react'
import formatDate from '@/utils/formatDate'
import EventBus from '@/utils/EventBus'
import Watcher from '@/utils/Watcher'


Object.defineProperties(Component.prototype, {
  // 模拟api请求
  '$_api': {
    value: function ({success = true, duration = 1000, res} = {}) {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          if (success) {
            resolve(res)
          } else {
            reject(new Error())
          }
        }, duration)
      })
    }
  },
  // 将时间戳转为格式化时间
  '$_formatDate': {
    value: formatDate
  },
  '$_eventBus': {
    value: new EventBus()
  },
  '$_watch': {
    value(obj, key, handler) {
      if (typeof obj === 'string') {
        handler = key
        key = obj
        obj = this
      }
      const watcher = new Watcher(obj, key, handler)
      return watcher.unbind
    }
  }
})
