import React, { Component } from 'react'
import Footer from './_thumbs/Footer'
import AddTodo from './_containers/AddTodo'
import VisibleTodoList from './_containers/VisibleTodoList'

class Moudle_redux extends Component {
  render() {
    return (
      <div id="module-redux" className="flex--center">
        <div style={{ marginTop: '20px' }}>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </div>
      </div>
    )
  }
}

export default Moudle_redux
