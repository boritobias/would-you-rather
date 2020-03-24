import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading-bar'
import Dashboard from './Dashboard'
import Question from './Question'
import Login from './Login'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props
    return (
      <Router>
        <div>
          {authedUser === null ? <Login /> : <Nav />}
          
          <div>

          </div>
        </div>
      </Router>

    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)


// <Route path='/' exact component={Dashboard} />
// <Route path='/question/:id' component={Question} />