import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'

class QuizScreen extends Component {
  state = {
    deckId: this.props.navigation.getParam('deckId'),
    questionIds: this.getQuestionIds(this.props.navigation.getParam('deckId')),
    goodOnes: [],
    badOnes: []
  }

  getTotal(deckId) {
    let deck = this.props.decks[deckId]
    return deck.questions.length
  }
  getQuestionIds(deckId) {
    let deck = this.props.decks[deckId]
    return deck.questions
  }

  getCurrentQuestionId() {
    const answers = [...this.state.goodOnes, ...this.state.badOnes]
    let nextToAnswer = this.state.questionIds.filter((qid) => {
      return !answers.includes(qid)
    })
    return nextToAnswer[0]
  }

  getCurrentQuestionText() {
    let id = this.getCurrentQuestionId()
    let question = this.props.questions[id]
    if (question) {
      return question['questionText']
    } else {
      return ''
    }
  }

  //handle one more (you know for debug)
  logStatus() {
    let { goodOnes, deckId } = this.state;
    let newOnes = [...goodOnes, 'oneMore']
    console.log("all      => " + this.state.questionIds)
    console.log("current  =>" + this.getCurrentQuestionId())
    console.log("goodOnes => " + this.state.goodOnes)
    console.log("badOnes  => " + this.state.badOnes)
  }

  handleCorrect() {
    let goodOnes = [...this.state.goodOnes, this.getCurrentQuestionId()]
    let answers = [...goodOnes, ...this.state.badOnes]
    this.setState({ goodOnes })
    if (answers.length === this.state.questionIds.length) {
      console.log("Time to show sumary")
    }
    this.logStatus()
  }

  render() {
    console.log("id list => " + this.state.questionIds)
    return (
      <View>
        <Text>Hello from quiz screen</Text>
        <Text>{this.getCurrentQuestionId()}</Text>
        <Text>{this.getCurrentQuestionText()}</Text>
        <Button
          title="Go"
          onPress={() => this.handleCorrect()}
        />
      </View>
    )
  }
}

function mapStateToProps({ decks, questions }) {
  return {
    decks,
    questions
  }
}

export default connect(mapStateToProps)(QuizScreen)