import { RECEIVE_USERS, ADD_ANSWER_TO_USER, ADD_QUESTION_TO_USER } from '../actions/users'

export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case ADD_ANSWER_TO_USER :
      const { authedUser, id, answer } = action
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [id]: answer
          }
        }
      }
    case ADD_QUESTION_TO_USER :
      const { question } = action
      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat([question.id])
        }
      }
    default :
      return state
  }
}