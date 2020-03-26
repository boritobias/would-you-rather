import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Tab, Container } from 'semantic-ui-react'
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
    const panes = [
      { menuItem: 'Unanswered', render: () => (
        <List>
          {this.props.questionIds.map((id) => (
            !this.props.authedUserAnswerIds.some((e) => e === id) &&
            <List.Item key={id}>
              <QuestionTeaser id={id} />
            </List.Item>
          ))}
        </List>
      )},
      { menuItem: 'Answered', render: () => (
        <List>
          {this.props.questionIds.map((id) => (
            this.props.authedUserAnswerIds.some((e) => e === id) &&
            <List.Item key={id}>
              <QuestionTeaser id={id} />
            </List.Item>
          ))}
        </List>
      )},
    ]
    return (
      <Container style={{width: '60%'}}>
        <Tab panes={panes} />
      </Container>
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