import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'

class DeckScreen extends Component {

  constructor(props){
    super(props)
    const item = props.navigation.getParam('item')
    const deck = props.decks[item['id']]
    const toalCards = deck.questions.length

    const navigation = props.navigation
    this.state = {
      deck,
      navigation:props.navigation,
      toalCards
    }
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({gotFocus:true})
    });
  }

  deckCallBack = () => {
    const item = this.props.navigation.getParam('item')
    const deck = this.props.decks[item['id']]
    const totalCards = deck.questions.length
    this.setState({toalCards: totalCards})
  }

  render() {
    let {deck, navigation} = this.state
    return (
      <View>
        <Text>Hello deck {deck['title']}</Text>
        <Text>{this.state.toalCards} cards</Text>
        <Button
          title="Add Card"
          onPress={() => navigation.navigate('QuestionCreate', { 
            deckId: deck['id'], 
            deckCallBack:this.deckCallBack })}
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

export default connect(mapStateToProps)(DeckScreen)