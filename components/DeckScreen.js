import React, {Component} from 'react'
import { View, Text } from 'react-native'

class DeckScreen extends Component{
  render(){

    const { navigation } = this.props;
    const item =navigation.getParam('item')

    return (
      <View>
        <Text>Hello deck {item['title'] }</Text>
      </View>
    )
  }
}

export default DeckScreen