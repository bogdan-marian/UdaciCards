import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'UdaciCards:decks'
export const QUESTIONS_STORAGE_KEY = 'UdaciCards:questions'


function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

let initialDecks = {
  React: {
    id: 'React',
    title: 'React',
    totalQuestions:2,
    questions: ['question1', 'question2']
  },
  JavaScript: {
    id: 'JavaScript',
    title: 'JavaScript',
    totalQuestions:1,
    questions: ['question3',]
  }
}

let decks = undefined

let questions = undefined

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
          decks = JSON.parse(results)
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
          questions = JSON.parse(results)
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

function formatQuestion({ questionText, answer, deck }) {
  const myQuestion = {
    id: generateUID(),
    deck,
    questionText,
    answer
  }
  return myQuestion
}

export function _saveQuestion(question) {
  return new Promise((res, rej) => {
    const formattedQuestion = formatQuestion(question);
    let key = formattedQuestion.id

    setTimeout(() => {
      //stadnard redux
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      id = formattedQuestion.deck
      console.log(JSON.stringify(decks))
      console.log(JSON.stringify(id))

      decks = {
        ...decks,
        [id]: {
          ...decks[id],
          questions: decks[id].questions.concat([formattedQuestion.id])
        }
      }
      
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
      res(formattedQuestion)
    }, 500)
  })
}

export function formatDeck({ title }) {
  const myDeck = {
    id: generateUID(),
    title,
    totalQuestions:0,
    questions: []
  }
  return myDeck
}

export function _saveDeck(deck) {
  //standard redux
  return new Promise((res, rej) => {
    const formattedDeck = formatDeck(deck);
    setTimeout(() => {
      deck = {
        ...decks,
        [formatDeck.id]: formatDeck
      }
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
      res(formattedDeck)
    }, 500)
  })

  //asynck storage reudx
  // return new Promise((res, rej) => {
  //   const formattedDeck = formatDeck(deck);
  //   const key = formattedDeck.id
  //   setTimeout(() => {
  //     AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
  //       [key]: formattedDeck
  //     })).then(() => {
  //       res(formattedDeck)
  //     })
  //   }, 500)
  // })
}