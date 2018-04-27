import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from '@/redux'
import registerServiceWorker from '@/registerServiceWorker'

// scss入口文件
import '@/assets/style/index.scss'
// extends
import '@/extends/index'
// router
import Routers from '@/routers'

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>, document.getElementById('root'))
registerServiceWorker()
