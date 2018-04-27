import React from 'react'
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from '@/App'
import NotFound from '@/components/NotFound'
import CFG from './cfg'

const RouteWithSubRoutes = (route) => (
  <Route 
    path={route.path}
    render={props => (
      <route.component {...props} childRoutes={route.children} />
    )}/>
)

export default () => {
  return (
    <Router>
      <App>
        <Switch>
          {
            CFG.map((route, index) => {
              return <RouteWithSubRoutes key={index} {...route}/>
            })
          }
          <Route render={() => (<NotFound/>)}/>
        </Switch>
      </App>
    </Router>
  )
}