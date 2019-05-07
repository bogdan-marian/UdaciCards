import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'

class QuizScreen extends Component {
  static navigationOptions = {
    title: 'Quiz In Progress',
  };

  state = {
    deckId: this.props.navigation.getParam('deckId'),
    questionIds: this.getQuestionIds(this.props.navigation.getParam('deckId')),
    goodOnes: [],
    badOnes: [],
    showAnswer: false
  }

  getTotal(deckId) {
    let deck = this.props.decks[deckId]
    return deck.questions.length
  }
  getQuestionIds(deckId) {
    let deck = this.props.decks[deckId]
    return deck.questions
  }

  getRmainingQuestions(){
    let total = this.state.questionIds.length
    let remaining = this.state.goodOnes.length + this.state.badOnes.length
    return total - remaining
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

  getCurrentAnswer(){
    let id = this.getCurrentQuestionId()
    let question = this.props.questions[id]
    if (question) {
      return question['answer']
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
    let showAnswer = false
    this.setState({ goodOnes, showAnswer })
    this.logStatus()
    //this.navigateIfAllQuestions()
  }

  handleIncorrect() {
    let badOnes = [...this.state.badOnes, this.getCurrentQuestionId()]
    let showAnswer = false
    this.setState({ badOnes, showAnswer })
    this.logStatus()
    //this.navigateIfAllQuestions()
  }

  quizResetCallBack = () => {
    let goodOnes = []
    let badOnes = []
    this.setState({ goodOnes, badOnes })
  }

  componentDidUpdate() {
    this.navigateIfAllQuestions()
  }

  navigateIfAllQuestions() {
    let answers = [...this.state.goodOnes, ...this.state.badOnes]
    let { navigate } = this.props.navigation
    if (answers.length === this.state.questionIds.length) {
      navigate('QuizSummary', {
        deckId: this.state.deckId,
        goodOnes: this.state.goodOnes,
        badOnes: this.state.badOnes,
        quizResetCallBack: this.quizResetCallBack
      })
    }
  }

  handleShowAnswer() {
    let showAnswer = true
    this.setState({ showAnswer })
  }

  renderShowAnswer() {
    if (!this.state.showAnswer) {
      return (
        <Button
          title="Show Answer"
          onPress={() => this.handleShowAnswer()}
        />
      )
    }
  }

  renderAnswer() {
    if (this.state.showAnswer) {
      return (
        <View>
          <Text>{this.getCurrentAnswer()}</Text>
          <Button
            title="Correct"
            onPress={() => this.handleCorrect()}
          />
          <Button
            title="Incorrect"
            onPress={() => this.handleIncorrect()}
          />
        </View>
      )
    }
  }

  render() {
    console.log("id list => " + this.state.questionIds)
    return (
      <View>
        <Text>Remaining questions: {this.getRmainingQuestions()}</Text>
        <Text>{this.getCurrentQuestionText()}</Text>
        {this.renderShowAnswer()}
        {this.renderAnswer()}
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