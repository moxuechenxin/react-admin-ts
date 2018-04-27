import React, {Component} from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    })

    console.group("%cErrorBoundary：", "color: red;")
    console.log('error', error)
    console.log('info', info)
    console.groupEnd()
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>Something went wrong</h1>
      )
    }
    return this.props.children
  }
}