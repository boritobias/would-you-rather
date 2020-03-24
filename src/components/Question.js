import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionStatistics from './QuestionStatistics'
import { handleSaveQuestionAnswer } from '../actions/users'
import { Container, Form, Header, Segment, Menu, Image, Grid } from 'semantic-ui-react'

class Question extends Component {
  state = {
    value: ''
  }

  handleChange = (e, {value}) => {
    e.preventDefault()
    this.setState({value})
  }

  handleSubmitAnswer = (e) => {
    e.preventDefault()
    
    if (this.state.value !== '') {
      const { authedUser, question, handleSaveQuestionAnswer } = this.props
      handleSaveQuestionAnswer(authedUser, question.id, this.state.value)
    }
  }

  render() {
    const { question, user, authedUser, users } = this.props
    const { optionOne, optionTwo, id } = question
    const { name, avatarURL, answers } = user
    const authedUserVoted = users[authedUser].answers[id] ? true : false
    const userAnswer = authedUserVoted && users[authedUser].answers[id]
    const disabled = this.state.value === '' ? true : false
    
    console.log(userAnswer)

    return (
      <div>

        <Container>
          <Grid>
            <Grid.Column width={2}>
              <Image src={avatarURL} alt={`Avatar of ${name}`} size='small' className='avatar' />
            </Grid.Column>
            <Grid.Column width={10}>
              <Form>
                <Header as='h4'>Question by {name}:</Header>
                <Header as='h3'>Would you rather</Header>
                <Form.Radio
                  label={optionOne.text}
                  value='optionOne'
                  checked={this.state.value === 'optionOne'}
                  onChange={this.handleChange}
                />
                {authedUserVoted && 
                  <QuestionStatistics question={question} option='optionOne' />
                }
                <br />
                <Form.Radio
                  label={optionTwo.text}
                  value='optionTwo'
                  checked={this.state.value === 'optionTwo'}
                  onChange={this.handleChange}
                />
                {authedUserVoted && 
                  <QuestionStatistics question={question} option='optionTwo' />
                }
                <br />
                <Form.Button fluid disabled={disabled} onClick={this.handleSubmitAnswer}>Submit Answer</Form.Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>

      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]
  const user = users[question.author]

  return {
    authedUser,
    question,
    user,
    users
  }
}

export default connect(mapStateToProps, {handleSaveQuestionAnswer})(Question)