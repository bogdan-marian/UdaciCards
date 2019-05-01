export const RECEIVE_DECKS = 'RECEIVE_USERS'

export function receiveDecks(decks){
    return{
        type:RECEIVE_DECKS,
        decks,
    }
}