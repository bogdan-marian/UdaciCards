import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'UdaciCards:decks'
export const QUESTIONS_STORAGE_KEY = 'UdaciCards:questions'
import { generateUID } from './helpers'



let initialDecks = {
  React: {
    id: 'React',
    title: 'React',
    totalQuestions: 2,
    questions: ['question1', 'question2']
  },
  JavaScript: {
    id: 'JavaScript',
    title: 'JavaScript',
    totalQuestions: 1,
    questions: ['question3',]
  }
}

let initialQuestions = {
  "question1": {
    id: 'question1',
    deck: 'React',
    questionText: 'What is React?',
    answer: 'A library for managin user interfaces'
  },
  "question2": {
    id: 'question2',
    deck: 'React',
    questionText: 'Where do you make Ajax requests in React?',
    answer: 'The componentDidMount lifecycle event'
  },
  "question3": {
    id: 'question3',
    deck: 'JavaScript',
    questionText: 'What is a closure?',
    answer: 'The combination of a function and the lexical environment within which that function was declared.'
  },
}

export function _getDecks() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
          let decks = JSON.parse(results)
          if (decks) {
            res({ ...decks })
          } else {
            decks = initialDecks
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
            res({ ...decks })
          }
        })
    }, 500)
  })
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      AsyncStorage.getItem(QUESTIONS_STORAGE_KEY)
        .then((results) => {
          let questions = JSON.parse(results)
          if (questions) {
            res({ ...questions })
          } else {
            questions = initialQuestions
            AsyncStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions))
            res({ ...questions })
          }
        })
    }, 500)
  })
}

function formatQuestion({ questionText, answer, deck, id }) {
  const myQuestion = {
    id,
    deck,
    questionText,
    answer
  }
  return myQuestion
}

export function _saveNewQuestion(question) {
  return new Promise((res, rej) => {
    let formattedQuestion = formatQuestion(question);
    let key = formattedQuestion.id
    setTimeout(() => {
      AsyncStorage.mergeItem(QUESTIONS_STORAGE_KEY, JSON.stringify({
        [key]: formattedQuestion
      }))
      res(formattedQuestion)
    }, 500)
  })
}

function newDeckObject({ title }) {
  const myDeck = {
    id: generateUID(),
    title,
    totalQuestions: 0,
    questions: []
  }
  return myDeck
}

export function _saveNewDeck(deck) {
  //standard redux
  return new Promise((res, rej) => {
    const formattedDeck = newDeckObject(deck);
    let { id } = formattedDeck
    setTimeout(() => {
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [id]: formattedDeck
      }))
      res(formattedDeck)
    }, 500)
  })
}

export function _updateDeck(data) {
  const { deckId, questionId } = data
  console.log("_updateDeck: " + deckId + "/" + questionId)
  return new Promise((res, rej) => {
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results)
        console.log("_updateDeckResults: " + JSON.stringify(data[deckId].questions))
        data[deckId].questions.concat([questionId])
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
      })
      res(data)
  })
}

