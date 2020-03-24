import React, { Component } from 'react'

class QuestionStatistics extends Component {
  render() {
    const { question, option } = this.props

    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const allVotes = optionOneVotes + optionTwoVotes
    const optionOnePerc = Math.floor(optionOneVotes / allVotes * 100)
    const optionTwoPerc = Math.floor(optionTwoVotes / allVotes * 100)

    switch(option) {
      case 'optionOne' :
        return (
          <div>
            <div>
              <div>{`${optionOnePerc}% of voters chose this answer`}</div>
            </div>
            <div>
              <div>{`${optionOneVotes} out of ${allVotes}`}</div>
            </div>
          </div>
        )
        
      case 'optionTwo' :
        return (
          <div>
            <div>
              <div>{`${optionTwoPerc}% of voters chose this answer`}</div>
            </div>
            <div>
              <div>{`${optionTwoVotes} out of ${allVotes}`}</div>
            </div>
          </div>
        )
        
      
    }

  }
}

export default QuestionStatistics