import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class QuizSummaryScreen extends Component{

  static navigationOptions = {
    title: 'Quiz Summary',
  };

  state = {
    deckId: this.props.navigation.getParam('deckId'),
    goodOnes: this.props.navigation.getParam('goodOnes'),
    badOnes: this.props.navigation.getParam('badOnes'),
    quizResetCallBack: this.props.navigation.getParam('quizResetCallBack')
  }
  componentDidUpdate(){
    this.state.quizResetCallBack()
  }

  handleEndOfQuiz(screen){
    const {navigate} = this.props.navigation;
    this.state.quizResetCallBack()
    navigate(screen)
  }

  render(){
    let total = [...this.state.goodOnes, ...this.state.badOnes]
    const {navigate} = this.props.navigation;

    return (
      <View>
        <Text>Congratulations for compleating a study session.</Text>
        <Text>Deck id: {this.state.deckId}</Text>
        <Text>Total quiz questions: {total.length}</Text>
        <Text>Good answers: {this.state.goodOnes.length}</Text>
        <Text>Bad answers: {this.state.badOnes.length}</Text>
        <Button 
          title="Restart Quiz"
          onPress={()=>this.handleEndOfQuiz('Quiz')}
        />
        <Button 
          title="Back to Deck"
          onPress={()=>this.handleBackToDeck('Deck')}
        />
      </View>
    )
  }
}

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(QuizSummaryScreen)