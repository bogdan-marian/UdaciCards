import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'

class DeckScreen extends Component {
  render() {

    const { navigation } = this.props;
    const item = navigation.getParam('item')
    const deck = this.props.decks[item['id']]

    return (
      <View>
        <Text>Hello deck {deck['title']}</Text>
        <Text>{deck['questions'].length} cards</Text>
        <Button
          title="Add Card"
          onPress={()=> navigation.navigate('QuestionCreate',{ deckId:deck['id']})}
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