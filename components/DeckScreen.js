import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'

class DeckScreen extends Component {

  constructor(props){
    super(props)
    const item = props.navigation.getParam('item')
    const deck = props.decks[item['id']]

    const navigation = props.navigation
    this.state = {
      deck,
      navigation:props.navigation
    }
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({gotFocus:true})
    });
  }

  render() {
    let {deck, navigation} = this.state
    return (
      <View>
        <Text>Hello deck {deck['title']}</Text>
        <Text>{deck['questions'].length} cards</Text>
        <Button
          title="Add Card"
          onPress={() => navigation.navigate('QuestionCreate', { deckId: deck['id'] })}
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