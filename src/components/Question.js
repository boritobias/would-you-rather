import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container, Form, Header, Image, Grid } from 'semantic-ui-react'
import { handleSaveQuestionAnswer } from '../actions/users'
import QuestionStatistics from './QuestionStatistics'
import NoMatch from './NoMatch'

function Question(props) {
  const [value, setValue] = useState('')

  const handleChange = (e, {value}) => {
    setValue(value)
  }

  const handleSubmitAnswer = (e) => {
    e.preventDefault()
    
    if (value !== '') {
      const { authedUser, question, handleSaveQuestionAnswer } = props
      handleSaveQuestionAnswer(authedUser, question.id, value)
      setValue('')
    }
  }

    if (props.noMatch) {
      return (
        <NoMatch />
      )
    } else {

    const { question, user, authedUser, users } = props
    const { optionOne, optionTwo, id } = question
    const { name, avatarURL } = user
    const authedUserVoted = users[authedUser].answers[id] ? true : false
    const userAnswer = authedUserVoted && users[authedUser].answers[id]
    const disabled = value === '' ? true : false

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
                    checked={userAnswer === 'optionOne' || value === 'optionOne'}
                    onChange={handleChange}
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
                  checked={userAnswer === 'optionTwo' || value === 'optionTwo'}
                  onChange={handleChange}
                />
                </Form.Field>
                <Form.Field>
                {authedUserVoted && 
                  <QuestionStatistics question={question} option='optionTwo' />
                }
                </Form.Field>
              </Form.Group>
              
              <br />

              <Form.Button fluid disabled={disabled} onClick={handleSubmitAnswer}>Submit Answer</Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    )}
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params
  const noMatch = questions[id] === undefined ? true : false
  if (!noMatch) {
    const question = questions[id]
    const user = users[question.author]

    return {
      authedUser,
      question,
      user,
      users,
      noMatch
    }
  } else {
    return {
      noMatch
    }
  }
}

export default connect(mapStateToProps, {handleSaveQuestionAnswer})(Question)