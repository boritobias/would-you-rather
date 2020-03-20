import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  state = {
    showAnswered: false
  }

  handleToggle = (e) => {
    e.preventDefault()

    this.setState((prevState) => ({
      showAnswered: !prevState.showAnswered
    }))
  }

  render() {
    return (
      <div>
        <h3 className='center'>Would you rather?</h3>

        <button className='toggle-button'
          onClick={this.handleToggle}
        >
          {this.state.showAnswered ? 'SHOW UNANSWERED' : 'SHOW ANSWERED'}
        </button>

        {this.state.showAnswered
          ? <div className='answered'>
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
          : <div className='unanswered'>
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
        }
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