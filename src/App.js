import React, { Component } from 'react'
import LeftNav from '@/components/_common/leftNav'
import './App.scss'

class App extends Component {
  render() {
    return (
      <div id="App" className="flex">
        <LeftNav className="flex-item--none"/>
        <div id="content-wrap" className="flex-item">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default App
