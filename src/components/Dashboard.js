import React from 'react'
import { connect } from 'react-redux'
import { List, Tab, Container } from 'semantic-ui-react'
import QuestionTeaser from './QuestionTeaser'

function Dashboard(props) {
    const panes = [
      { menuItem: 'Unanswered', render: () => (
        <List>
          {props.questionIds.map((id) => (
            !props.authedUserAnswerIds.some((e) => e === id) &&
            <List.Item key={id}>
              <QuestionTeaser id={id} />
            </List.Item>
          ))}
        </List>
      )},
      { menuItem: 'Answered', render: () => (
        <List>
          {props.questionIds.map((id) => (
            props.authedUserAnswerIds.some((e) => e === id) &&
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

function mapStateToProps({ authedUser, users, questions}) {

  return {
    authedUserAnswerIds: Object.keys(users[authedUser].answers),
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)