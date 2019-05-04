import React, { Component } from 'react'
import { View, Text } from 'react-native'
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