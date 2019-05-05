import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { handlDeckAppendQuestionId } from '../actions/decks'
import { generateUID } from '../utils/helpers'

class QuestionCreateScreen extends Component {
  state = {
    deckId: this.props.navigation.getParam('deckId'),
    deckCallBack: this.props.navigation.getParam('deckCallBack'),
    questionText: '',
    answer: '',
    timeToNavigate: false,
    id: generateUID()
  }

  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  canSubmit() {
    if (this.state.deckId && this.state.questionText && this.state.answer) {
      return true
    } else {
      return false
    }
  }

  componentDidUpdate() {
    const { navigate } = this.props.navigation
    if (this.state.timeToNavigate === true) {
      let deckId = this.props.navigation.getParam('deckId', 'JavaScript')
      const { decks, questions } = this.props
      let item = decks[deckId]
      this.state.deckCallBack()
      navigate('Deck', { item: item })
    }
  }

  handleSubmit = () => {
    const { deckId, questionText, answer, id } = this.state
    const { dispatch } = this.props
    const questionId = id


    dispatch(handleAddQuestion(deckId, questionText, answer, id))
    dispatch(handlDeckAppendQuestionId(deckId, questionId))

    this.setState(() => ({
      deckId,
      questionText: '',
      answer: '',
      id: generateUID(),
      timeToNavigate: true
    }))

  }

  render() {
    return (
      <View>
        <Text>Hello from Create Card</Text>
        <Text>Question</Text>
        <TextInput
          placeholder="The question text"
          defaultValue={this.state.questionText}
          onChangeText={(questionText) => {
            this.setState({ questionText })
          }}
        />
        <Text>Answer</Text>
        <TextInput
          placeholder="The correct answer"
          defaultValue={this.state.answer}
          onChangeText={(answer) => {
            this.setState({ answer })
          }}
        />
        <Button
          disabled={!this.canSubmit()}
          onPress={() => (this.handleSubmit())}
          title="Create New Card"
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

export default connect(mapStateToProps)(QuestionCreateScreen)