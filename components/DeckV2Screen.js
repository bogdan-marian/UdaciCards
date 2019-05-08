import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
class DeckV2Screen extends Component {
  static navigationOptions = {
    title: 'Deck screen V2',
  };

  state = {
    deckId: this.props.navigation.getParam('deckId')
  }

  getDeckTitle() {
    let { decks } = this.props
    let deck = decks[this.state.deckId]
    if (deck) {
      return decks[this.state.deckId]['title']
    } else {
      return '...'
    }
  }

  deckCallBack = () => {
    //not needed anymore with the new iproved architecture. 
    //for the moment is still refferencd by QuestionCreateScreen
  }

  handleStartQuiz (){
    const { navigate } = this.props.navigation
    if (this.state.toalCards <= 0){
      console.log("Please implement navigation to NoQuizAvailable")
    }else{
      console.log("Time to navigate")
      navigate('Quiz',{
        deckId:this.state.deckId,
      })
    }
  }

  getTotalCards() {
    let { decks } = this.props
    let deck = decks[this.state.deckId]
    if (deck) {
      return decks[this.state.deckId]['questions'].length
    } else {
      return '...'
    }
  }

  renderButtons() {
    let { decks } = this.props
    let deck = decks[this.state.deckId]
    let navigation = this.props.navigation
    let isDisabeled = true
    if (deck) {
      isDisabeled = false
    }
    return (
      <View>
        <Button
          title="Add Card"
          disabled={isDisabeled}
          onPress={() => navigation.navigate('QuestionCreate', {
            deckId: deck['id'],
            deckCallBack: this.deckCallBack
          })}
        />
        <Button
          disabled={isDisabeled}
          title="Start Quiz"
          onPress={() => this.handleStartQuiz()}
        />
      </View>
    )
  }


  render() {

    return (
      <View>
        <Text>Deck title: {this.getDeckTitle()}</Text>
        <Text>Total cards: {this.getTotalCards()}</Text>
        {this.renderButtons()}
      </View>
    )
  }
}

function mapStateToProps({ decks }) {
  return {
    decks
  }
}



export default connect(mapStateToProps)(DeckV2Screen)