import React, { Component } from 'react'
import { View, TouchableOpacity, Text ,Button} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {submitEntry, removeEntry} from '../utils/api'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
        <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

export default class AddEntry extends Component{
  state = {
    title: 'New Deck',
    questions: []
  }

  submit = () => {
    const key = this.state.title
    const deck = this.state

    // Navigate to home

    submitEntry({key, deck})

    // Clear local notification
  }

  reset = () => {
    const key = this.state.title

    //update Redux

    //Route to Home

    removeEntry(key)
  }

  render(){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput 
          placeholder="Card name: "
          onChangeText = {(title) => this.setState({title})}
        />
        <Button
          title="Submit"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }
}
