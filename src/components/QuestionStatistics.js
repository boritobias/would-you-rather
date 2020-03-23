import React, { Component } from 'react'

class QuestionStatistics extends Component {
  render() {
    const { optionOne, optionTwo } = this.props.question

    const optionOneVotes = optionOne.votes.length
    const optionTwoVotes = optionTwo.votes.length
    const allVotes = optionOneVotes + optionTwoVotes
    const optionOnePerc = Math.floor(optionOneVotes / allVotes * 100)
    const optionTwoPerc = Math.floor(optionTwoVotes / allVotes * 100)

    return (
      <div>
        <div>
          <div>{`${optionOnePerc}% of voters chose this answer`}</div>
          <div>{`${optionTwoPerc}% of voters chose this answer`}</div>
        </div>
        <div>
          <div>{`${optionOneVotes} out of ${allVotes}`}</div>
          <div>{`${optionTwoVotes} out of ${allVotes}`}</div>
        </div>
      </div>
    )
  }
}

export default QuestionStatistics