import { addQuestionToUser } from './users'
import { saveQuestion } from '../utils/API'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function answerQuestion(authedUser, id, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    id,
    answer
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
}