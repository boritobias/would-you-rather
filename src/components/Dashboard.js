import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, List } from 'semantic-ui-react'
import Question from './Question'
import QuestionTeaser from './QuestionTeaser'

class Dashboard extends Component {
  state = {
    showAnswered: false
  }

  handleClick = (value) => {

    this.setState({
      showAnswered: value
    })
  }

  render() {
    return (
      <div>
        <Button.Group attached='top' widths={2}>
          <Button onClick={() => this.handleClick(false)}>UNANSWERED</Button>
          <Button onClick={() => this.handleClick(true)}>ANSWERED</Button>
        </Button.Group>

        <br />

        {this.state.showAnswered
          ? <div className='answered'>
              <List>
                {this.props.questionIds.map((id) => (
                  this.props.authedUserAnswerIds.some((e) => e === id) &&
                  <List.Item key={id}>
                    <QuestionTeaser id={id} />
                  </List.Item>
                ))}
              </List>
            </div>
          : <div className='unanswered'>
              <List>
                {this.props.questionIds.map((id) => (
                  !this.props.authedUserAnswerIds.some((e) => e === id) &&
                  <List.Item key={id}>
                    <QuestionTeaser id={id} />
                  </List.Item>
                ))}
              </List>
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