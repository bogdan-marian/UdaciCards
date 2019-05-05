import {RECEIVE_DECKS, ADD_DECK, DECK_APEND_QUESTION_ID} from '../actions/decks'

export default function decks (state = {}, action){
  switch(action.type){
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deck.id]:action.deck
      }
    case DECK_APEND_QUESTION_ID:
      return {
        ...state,
        [action.deckId]:{
          ...state[action.deckId],
          questions: state[action.deckId].questions.concat([action.questionId])
        }
      }
    default:
      return state
  }
}