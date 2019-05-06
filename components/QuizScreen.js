import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'

class QuizScreen extends Component{
  render(){
    return (
      <View>
        <Text>Hello from quiz screen</Text>
      </View>
    )
  }
}

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps) (QuizScreen)