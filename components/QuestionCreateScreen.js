import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class QuestionCreateScreen extends Component {
  state = {
    deckId: '',
    questionText: '',
    answer: '',
    timeToNavigate: false
  }

  componentDidUpdate(){
    const {goBack} = this.props.navigation
    if (this.state.timeToNavigate === true){
      goBack()
    }
  }

  handleSubmit = () => {
    const { deckId, questionText, answer } = this.state
    const { dispatch } = this.props

    //dispatch (handleAddQuestion(deckId, questionText, answer))
    this.setState(() => ({
      deckId: '',
      questionText: '',
      answer: '',
      timeToNavigate: true
    }))
  }

  render() {
    let deckId = this.props.navigation.getParam('deckId')
    console.log("Deck id = " + deckId)
    return (
      <View>
        <Text>Hello from Create Card</Text>
        <Text>Question</Text>
        <TextInput
          placeholder="The question text"
        />
        <Text>Answer</Text>
        <TextInput
          placeholder="The correct answer"
        />
        <Button
          onPress={() => (this.handleSubmit())}
          title="Create New Card"
        />
      </View>
    )
  }
}

function mapStateToProps() {
  return {
  }
}

export default connect(mapStateToProps)(QuestionCreateScreen)