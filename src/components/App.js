import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Question from './Question'
import Login from './Login'
import Nav from './Nav'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props
    console.log('App: ', authedUser)
    return (
      <Router>
        {authedUser === null
          ? <Login />
          : <div>
              <Nav />
              <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/questions/:id' component={Question} />
              </div>
            </div>
        }
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
// <Question id='vthrdm985a262al8qx3do' />