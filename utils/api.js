


// export function hackGetAll(){
//   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
// }

// export function submitEntry({entry, key}){
//   return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
//     [key]:entry
//   }))
// }

// export function removeEntry(key){
//   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[key] = undefined
//       delete data[key]
//       AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
//     })
// }

import {
  _getDecks,
  _saveDeck,
  _getQuestions,
  _saveQuestion
} from './_data.js'


export function getInitialData() {
  return Promise.all([
    _getDecks(),
    _getQuestions(),
  ]).then(([decks, questions ]) => ({
    decks,
    questions
  }))
}

export function saveQuestion(info) {
  return _saveQuestion(info)
}

export function saveDeck(info){
  return _saveDeck(info)
}
