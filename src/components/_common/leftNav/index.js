import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import './index.scss'
import allRouters from '@/routers/cfg'

class LeftNav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedKeys: props.location.pathname
    }
  }

  handleSelect ({ key }) {
    this.setState({
      selectedKeys: key
    }, () => {
      this.props.history.push(key)
    })
  }

  render () {
    const props = this.props
    const state = this.state
    return (
      <div className={`comp-leftnav ${props.className}`}>
        <h3 className="top-title flex--vcenter">后台管理系统</h3>
        <Menu
          theme="dark"
          selectedKeys={[state.selectedKeys]}
          onSelect={this.handleSelect.bind(this)}>
          {
            allRouters.filter(item => item.meta && item.meta.level ===0).map(route => {
              return (
                <Menu.Item key={route.path}>
                  { route.meta && route.meta.label }
                </Menu.Item>
              )
            })
          }
        </Menu>
      </div>
    )
  }
}
export default withRouter(LeftNav)