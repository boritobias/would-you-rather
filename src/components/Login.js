import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Dropdown, Button, Header } from 'semantic-ui-react'
import { setAuthedUser } from '../actions/authedUser'
import AppHeader from './AppHeader'

function Login(props) {
  const [value, setValue] = useState('')

  const onChange = (e, { value }) => {
    setValue(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const authedUser = value
    props.dispatch(setAuthedUser(authedUser))
  }

  const dropdownOptions = () => {
    const { users } = props

    return users.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL },
    }))
  }

    const disabled = value === '' ? true : false

    return (
      <div>
       <AppHeader />
        <Header textAlign='center'>Log in to use the app</Header>
        <Form onSubmit={handleSubmit} className='login-center'>
          <Dropdown
            placeholder='Select a user'
            fluid
            selection
            options={dropdownOptions()}
            onChange={onChange}
          />
          <Button disabled={disabled}>Log in</Button>
        </Form>
      </div>
    )
}


function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  }
}

export default connect(mapStateToProps)(Login)