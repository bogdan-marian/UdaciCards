import { saveQuestion } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(deck, questionText, answer) {
  return (dispatch, getState) => {
    return saveQuestion({
      questionText,
      answer,
      deck
    })
      .then((question) => dispatch(addQuestion(question)))
  }
}