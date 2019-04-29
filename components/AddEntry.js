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
  
  submit = () => {
    const key = 1
    const entry = this.state

    this.props.dispatch(addEntry({
      [key]:entry
    }))

    this.setState(() => ({
      deckTitle:'new deck',
      questions:[]
    }))

    // Navigate to home

    submitEntry({key, entry})

    // Clear local notification
  }

  reset = () => {
    const key = 1

    //update Redux
    this.props.dispatch(addEntry({
      [key]:'new deck'
    }))

    //Route to Home

    removeEntry(key)
  }

  render(){
    return(
      <View style={{ flexDirection: 'column',  alignItems: 'center' }}>
        <Text style={{paddingTop:50}} >New deck: {this.props.state}</Text>
        <TextInput 
          placeholder="Card name: "
          onChangeText = {(title) => this.setState({title})}
        />
        
        <SubmitBtn onPress={this.submit}/>
      </View>
    )
  }
}

function mapStateToProps(state){
  const key = 1

  return{
    
  }
}

export default connect(mapStateToProps)(AddEntry)