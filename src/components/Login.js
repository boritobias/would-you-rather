import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Form, Dropdown, Button } from 'semantic-ui-react'

class Login extends Component {
  state = {
    value: ''
  }
  
  onChange = (e, { value }) => {
    console.log(value)
    this.setState({ value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const authedUser = this.state.value
    this.props.dispatch(setAuthedUser(authedUser))
  }

  dropdownOptions = () => {
    const { users } = this.props
    
    return users.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL },
    }))
  }
  render() {
    const disabled = this.state.value === '' ? true : false
    
    return (
      <div>
        <h4>Log in to use the app</h4>
        <Form onSubmit={this.handleSubmit}>
          <Dropdown
            placeholder='Select a user'
            fluid
            selection
            options={this.dropdownOptions()}
            onChange={this.onChange}
          />
          <Button disabled={disabled}>Log in</Button>
        </Form>
      </div>
    )
  }
}


function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  }
}

export default connect(mapStateToProps)(Login)