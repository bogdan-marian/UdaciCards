import {saveDeck, updateDeck} from '../utils/api'
import {} from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_USERS'
export const ADD_DECK = 'ADD_DECK'
export const DECK_APEND_QUESTION_ID = 'DECK_APEND_DECK'


export function receiveDecks(decks){
    return{
        type:RECEIVE_DECKS,
        decks,
    }
}

export function addDeck(deck){
    return {
        type: ADD_DECK,
        deck
    }
}

export function deckAppendQuestionId(deckId, questionId){
    return {
        type:DECK_APEND_QUESTION_ID,
        deckId,
        questionId
    }
}

export function handleAddDeck (title){
    return (dispatch, getState)=>{
        return saveDeck({title})
            .then((deck)=>dispatch(addDeck(deck)))
    }
}

export function handlDeckAppendQuestionId(deckId,questionId){
    console.log("actions->decks->handlDeckAppendQuestionId-> " + deckId  + "/ "+ questionId)
    return (dispatch, getState)=>{
        return updateDeck({
            deckId,
            questionId
        }).then(()=>{
            console.log("Some more logging")
            dispatch(deckAppendQuestionId(deckId,questionId))
        })
            
                console.log("actionsInnerDispatch->decks->handlDeckAppendQuestionId-> " + deckId  + "/ "+ questionId)
               // dispatch(deckAppendQuestionId(deckId,questionId))
           
    }
}