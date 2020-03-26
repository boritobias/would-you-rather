import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionStatistics from './QuestionStatistics'
import { handleSaveQuestionAnswer } from '../actions/users'
import { Container, Form, Header, Image, Grid } from 'semantic-ui-react'

class Question extends Component {
  state = {
    value: ''
  }

  handleChange = (e, {value}) => {
    this.setState({value})
  }

  handleSubmitAnswer = (e) => {
    e.preventDefault()
    
    if (this.state.value !== '') {
      const { authedUser, question, handleSaveQuestionAnswer } = this.props
      handleSaveQuestionAnswer(authedUser, question.id, this.state.value)
      this.setState({value: ''})
    }
  }

  render() {
    const { question, user, authedUser, users } = this.props
    const { optionOne, optionTwo, id } = question
    const { name, avatarURL } = user
    const authedUserVoted = users[authedUser].answers[id] ? true : false
    const userAnswer = authedUserVoted && users[authedUser].answers[id]
    const disabled = this.state.value === '' ? true : false

    return (
      <Container>
        <Grid>
          <Grid.Column width={3}>
            <Image src={avatarURL} alt={`Avatar of ${name}`} size='tiny' className='avatar' />
          </Grid.Column>
          <Grid.Column width={6}>
            <Form>
              <Header as='h4' className='question-header' style={{color: '#969696'}}>Question by {name}:</Header>
              <Header as='h3'>Would you rather</Header>
              <Form.Group style={{'display': 'block'}} className={userAnswer === 'optionOne' ? 'chosen-answer' : 'not-chosen-answer'}>
                <Form.Field>
                  <Form.Radio
                    label={optionOne.text}
                    value='optionOne'
                    readOnly={authedUserVoted}
                    checked={userAnswer === 'optionOne' || this.state.value === 'optionOne'}
                    onChange={this.handleChange}
                  />
                </Form.Field>

                <Form.Field>
                  {authedUserVoted && 
                    <QuestionStatistics question={question} option='optionOne' />
                  }
                </Form.Field>
              </Form.Group>

              <br />

              <Form.Group style={{'display': 'block'}}  className={userAnswer === 'optionTwo' ? 'chosen-answer' : 'not-chosen-answer'}>
              <Form.Field>
                <Form.Radio
                  label={optionTwo.text}
                  value='optionTwo'
                  readOnly={authedUserVoted}
                  checked={userAnswer === 'optionTwo' || this.state.value === 'optionTwo'}
                  onChange={this.handleChange}
                />
                </Form.Field>
                <Form.Field>
                {authedUserVoted && 
                  <QuestionStatistics question={question} option='optionTwo' />
                }
                </Form.Field>
              </Form.Group>
              
              <br />

              <Form.Button fluid disabled={disabled} onClick={this.handleSubmitAnswer}>Submit Answer</Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params
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