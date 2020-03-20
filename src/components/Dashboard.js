import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  render() {
    console.log(this.props.authedUserAnswerIds)
    return (
      <div>
        <h3 className='center'>Would you rather?</h3>
        <div className='unanswered'>
          <h4>Unanswered</h4>
          <ul>
            {this.props.questionIds.map((id) => (
              !this.props.authedUserAnswerIds.some((e) => e === id) &&
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </div>
        <div className='answered'>
          <h4>Answered</h4>
          <ul>
            {this.props.questionIds.map((id) => (
              this.props.authedUserAnswerIds.some((e) => e === id) &&
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions}) {

  return {
    authedUserAnswerIds: Object.keys(users[authedUser].answers),
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)