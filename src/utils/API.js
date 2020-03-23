import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestionAnswer (authedUser, id, answer) {
  return _saveQuestionAnswer({ authedUser, id, answer })
}
  
export function saveQuestion (question) {
  return _saveQuestion(question)
}