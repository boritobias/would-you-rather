import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionStatistics from './QuestionStatistics'
import { handleSaveQuestionAnswer } from '../actions/users'

class Question extends Component {
  state = {
    value: ''
  }
  handleAnswerChoice = (e, value) => {
    e.preventDefault()
    this.setState({value})
    if (this.state.value !== '') {
      const { authedUser, question, handleSaveQuestionAnswer } = this.props
      handleSaveQuestionAnswer(authedUser, question.id, this.state.value)
    }
  }

  render() {
    const { question, user, authedUser } = this.props
    const { optionOne, optionTwo, id } = question
    const { name, avatarURL, answers } = user
    const authedUserVoted = optionOne.votes.some((e) => e === authedUser) || optionTwo.votes.some((e) => e === authedUser)
    const userAnswer = authedUserVoted && answers[id]

    return (
      <div className='question'>
        <img
          src={avatarURL}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='question-info'>
          <span>{name}</span>
          <span>
            <div>Would you rather</div>
          </span>

          <div>
            <div>
              <button className={'option-one'}
                style={{backgroundColor: `${userAnswer === 'optionOne' && '#7e9caa'}`}}
                value='optionOne'
                onClick={this.handleAnswerChoice}
              >{optionOne.text}</button>
              <div>or</div>
              <button className={'option-two'}
                style={{backgroundColor: `${userAnswer === 'optionTwo' && '#7e9caa'}`}}
                value='optionTwo'
                onClick={this.handleAnswerChoice}
              >{optionTwo.text}</button>
            </div>

            {authedUserVoted && 
              <QuestionStatistics question={question} />
            }

          </div>

        </div>
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