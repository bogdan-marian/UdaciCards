import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './_data'


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
  _getQuestions,
  _saveQuestion
} from './_data.js'


export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([decks, quetions]) => ({
    decks,
    quetions
  }))
}

export function saveQuestion(info) {
  console.log('saveQuestion')
  console.log(info)
  return _saveQuestion(info)
}
