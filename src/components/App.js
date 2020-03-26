import React, { Component, Fragment  } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Question from './Question'
import Login from './Login'
import Nav from './Nav'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'
import NoMatch from './NoMatch'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authedUser } = this.props

    return (
      <Router>
        <Fragment>
          {authedUser === null
            ? <Route path='/' component={Login} />
            : <Fragment>
                <Nav />
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route path='/questions/:id' component={Question} />
                  <Route path='/new' component={NewQuestion} />
                  <Route component={NoMatch} />
                </Switch>
              </Fragment>
          }
        </Fragment>
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
// <Route path='/404' component={NotFound}/>
