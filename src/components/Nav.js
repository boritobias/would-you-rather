import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'
import { setAuthedUser } from '../actions/authedUser'
import AppHeader from './AppHeader'

class Nav extends Component {
  handleLogOut = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(null))
  }
  render() {
    const { authedUser, users } = this.props
    const loggedInUser = authedUser && users[authedUser]
    return (
      <div className='navbar'>
        <AppHeader />
        <Menu>
          <Menu.Item name='home' as={NavLink} exact to='/' />
          <Menu.Item name='new question' as={NavLink} to='/new' />
          <Menu.Item name='leaderboard' as={NavLink} to='/leaderboard' />
          <Menu.Item position='right'>Logged in as {loggedInUser.name} <Image src={loggedInUser.avatarURL} alt={`Avatar of ${loggedInUser.name}`} size='mini' className='avatar' /></Menu.Item>
          <Menu.Item name='log out' position='right' as={NavLink} to='/login' onClick={this.handleLogOut} />
        </Menu>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(Nav)