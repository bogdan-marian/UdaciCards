import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'UdaciCards:decks'


function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

let initialDecks = {
  React: {
    id: 'React',
    title: 'React',
    questions: ['question1', 'question2']
  },
  JavaScript: {
    id: 'JavaScript',
    title: 'JavaScript',
    questions: ['question3',]
  }
}

let questions = {}

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
            console.log("wee have data: " + JSON.stringify(decks))
            res ({...decks})
          } else {
            console.log("no data: " + JSON.stringify(decks))
            decks = initialDecks
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
            res ({...decks})
          }
        })
    }, 500)
  })
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 500)
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
    const deck = question.deck;
    const formattedQuestion = formatQuestion(question);
    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      decks = {
        ...decks,
        [deck]: {
          ...decks[deck],
          questions: decks[deck].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 500)
  })
}

export function formatDeck({ title }) {
  const myDeck = {
    id: generateUID(),
    title,
    questions: []
  }
  return myDeck
}

export function _saveDeck(deck) {
  //standard redux
  // return new Promise((res, rej) => {
  //   const formattedDeck = formatDeck(deck);
  //   setTimeout(() => {
  //     deck = {
  //       ...decks,
  //       [formatDeck.id]: formatDeck
  //     }
  //     res(formattedDeck)
  //   }, 500)
  // })

  //asynck storage reudx
  return new Promise((res, rej) => {
    const formattedDeck = formatDeck(deck);
    const key = formattedDeck.id
    setTimeout(() => {
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [key]: formattedDeck
      })).then(() => {
        res(formattedDeck)
      })
    }, 500)
  })
}