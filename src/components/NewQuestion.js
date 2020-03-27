import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Form, Header, Container } from 'semantic-ui-react'
import { handleSaveQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit = (e) => {
    const { optionOne, optionTwo } = this.state
    const { authedUser, handleSaveQuestion } = this.props
    handleSaveQuestion(optionOne, optionTwo, authedUser)
    this.setState({
      optionOne: '',
      optionTwo: '',
      toHome: true
    })
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state

    if (toHome) {
      return <Redirect to='/' />
    }

    return (
      <Container style={{width: '50%'}}>
        <Header as='h2' textAlign='center'>Create New Question</Header>

        <br />

        <Header as='h3' textAlign='center'>Would you rather</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <input required placeholder='Option 1' value={optionOne} onChange={this.handleInputChange} id='optionOne' />
          </Form.Field>
          <Header as='h4' textAlign='center'>or</Header>
          <Form.Field>
            <input required placeholder='Option 2' value={optionTwo} onChange={this.handleInputChange} id='optionTwo' />
          </Form.Field>
          <Button type='submit'>Submit New Question</Button>
        </Form>
      </Container>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, { handleSaveQuestion })(NewQuestion)