import {saveDeck} from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_USERS'
export const ADD_DECK = 'ADD_DECK'


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

export function handleAddQuestion (title){
    return (dispatch, getState)=>{
        return saveDeck({title})
            .then((deck)=>dispatch(addDeck(deck)))
    }
}