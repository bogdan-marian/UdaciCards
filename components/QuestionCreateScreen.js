import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class QuestionCreateScreen extends Component {
  state = {
    deckId: this.props.navigation.getParam('deckId'),
    questionText: '',
    answer: '',
    timeToNavigate: false
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
      let deckId = this.props.navigation.getParam('deckId')
      console.log("QcomponentDidUpdate deckId = " + deckId)
      const {decks,questions} = this.props
      console.log("QcomponentDidUpdate decks = " + JSON.stringify(this.props))
      let item = decks[deckId]
      console.log("QcomponentDidUpdate item = " + JSON.stringify(item))
      navigate('Deck',{ item:item})
    }
  }

  handleSubmit = () => {
    const { deckId, questionText, answer } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(deckId, questionText, answer))
    this.setState(() => ({
      deckId,
      questionText: '',
      answer: '',
      timeToNavigate: true
    }))
  }

  render() {
    let deckId = this.props.navigation.getParam('deckId')
    return (
      <View>
        <Text>Hello from Create Card</Text>
        <Text>Question</Text>
        <TextInput
          placeholder="The question text"
          defaultValue={this.state.questionText}
          onChangeText={(questionText) => {
            this.setState({questionText})
          }}
        />
        <Text>Answer</Text>
        <TextInput
          placeholder="The correct answer"
          defaultValue={this.state.answer}
          onChangeText={(answer) => {
            this.setState({answer})
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

function mapStateToProps({decks,questions}) {
  return {
    decks:decks,
    questions:questions
  }
}

export default connect(mapStateToProps)(QuestionCreateScreen)