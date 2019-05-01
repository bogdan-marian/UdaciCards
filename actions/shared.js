import {getInitialData} from '../utils/api'
import {receiveDecks} from '../actions/decks'
import {receiveQuestions} from '../actions/questions'

export function handleInitialData(){
  return (dispatch) => {
    return getInitialData()
      .then(({decks, questions}) => {
        dispatch(receiveDecks(decks))
        dispatch(receiveQuestions(questions))
      })
  }
}
