import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {createDeck} from '../utils/api'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
        <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

export default class AddDeck extends Component{
  state = {
    title: 'New Deck',
    questions: []
  }

  submit = () => {
    const key = this.state.title
    const deck = this.state

    createDeck({key, deck})
  }

  render(){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput 
          placeholder="Card name: "
          onChangeText = {(title) => this.setState({title})}
        />
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}
