import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'UdaciCards:cards'


function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

let decks = {
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

let questions = {
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
    setTimeout(() => res({ ...decks }), 1000)
  })
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 1000)
  })
}

function formatQuestion({ questionText, answer, deck }) {
  console.log("formatQuestion")
  console.log(questionText)
  console.log(answer)

  const myQuestion = {
    id: generateUID(),
    deck,
    questionText,
    answer
  }
  console.log('myQuestion')
  console.log(myQuestion)
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
    }, 1000)
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
  return new Promise((res, rej) => {
    const formattedDeck = formatDeck(deck);
    setTimeout(() => {
      deck = {
        ...decks,
        [formatDeck.id]: formatDeck
      }
      res(formattedDeck)
    }, 1000)
  })
}