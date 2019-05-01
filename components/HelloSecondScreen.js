import React, { Component } from 'react'
import { View, Text } from 'react-native'
class HelloSecondScreen extends Component {
  static navigationOptions = {
    title: 'HelloSecondScreen',
    tabBarVisible: false,
  };



  render() {
    return (
      <View >
        <Text>
          Hello from simple HELLO
        </Text>
      </View>
    )
  }
}

export default HelloSecondScreen