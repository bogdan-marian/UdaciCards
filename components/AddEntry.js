import React, { Component } from 'react'
import { View, TouchableOpacity, Text ,Button} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {submitEntry, removeEntry} from '../utils/api'
import {connect} from 'react-redux'
import {addEntry} from '../actions'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
        <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component{
  state = {
    title: 'New Deck',
    questions: []
  }

  submit = () => {
    const key = this.state.title
    const deck = this.state

    this.props.dispatch(addEntry)

    this.setState(() => ({
      title:'new deck'
    }))

    // Navigate to home

    submitEntry({key, deck})

    // Clear local notification
  }

  reset = () => {
    const key = this.state.title

    //update Redux
    this.props.dispatch(addEntry({
      [key]:'new deck'
    }))

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
          //onPress={() => this.props.navigation.navigate('Home')}
          onPress={this.submit}
        />
      </View>
    )
  }
}

function mapStateToProps({}){
  return{

  }
}

export default connect(mapStateToProps)(AddEntry)