import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
  state = {
    title: ''
  }

  submit = () => {
    const key = 1
    const entry = this.state

    // this.props.dispatch(addEntry({
    //   [key]: entry
    // }))

    this.setState(() => ({
      deckTitle: 'new deck',
      questions: []
    }))

    // Navigate to home

    submitEntry({ key, entry })

    // Clear local notification
  }

  reset = () => {
    const key = 1

    //update Redux
    this.props.dispatch(addEntry({
      [key]: 'new deck'
    }))

    //Route to Home

    removeEntry(key)
  }

  render() {

    if (this.props.weeHaveData) {
      return (
        <Text style={{ paddingTop: 50 }} >Wee have data {this.props.state}</Text>
      )
    } else {
      return (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{ paddingTop: 50 }} >New deck: {this.props.state}</Text>
          <TextInput
            placeholder="Card name: "
            onChangeText={(title) => this.setState({ title })}
          />

          <SubmitBtn onPress={this.submit} />
          <Text>
            Deck name: {this.state.title}
          </Text>
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  const key = 1

  return {
    weeHaveData: state[key]
  }
}

export default connect(mapStateToProps)(AddEntry)