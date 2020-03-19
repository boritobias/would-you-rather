import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  render() {
    const { question, user } = this.props
    const { optionOne, optionTwo } = question
    const { id, name, avatarURL } = user
    const voted = optionOne.votes.some((e) => e === id) || optionTwo.votes.some((e) => e === id)
    const optionOneVotes = optionOne.votes.length
    const optionTwoVotes = optionTwo.votes.length
    const allVotes = optionOneVotes + optionTwoVotes
    const optionOnePerc = Math.floor(optionOneVotes / allVotes * 100)
    const optionTwoPerc = Math.floor(optionTwoVotes / allVotes * 100)

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
              <span>{optionOne.text}</span>
              <span>or</span>
              <span>{optionTwo.text}</span>
              <span>?</span>
            </div>
            {voted && 
              <div>
                <div>
                  <span>{`${optionOnePerc}% of voters chose this answer`}</span>
                  <span>{`${optionTwoPerc}% of voters chose this answer`}</span>
                </div>
                <div>
                  <span>{`${optionOneVotes} out of ${allVotes}`}</span>
                  <span>{`${optionTwoVotes} out of ${allVotes}`}</span>
                </div>
              </div>
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
    user
  }
}

export default connect(mapStateToProps)(Question)