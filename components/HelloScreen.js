import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import {connect} from 'react-redux'

class HelloScreen extends Component {
  static navigationOptions = {
    title: 'HelloScreen',
  };

  render() {
    return (
      <View >
        <Text >
          Hello from simple HELLO
        </Text>
        <View >
          <Button 
          title="Go to seccond hello"
          onPress={()=> this.props.navigation.navigate('Second')}
        />
        </View>
        
      </View>
    )
  }
}

function mapStateToProps({questions, decks}){
  return {
    questions:questions
  }
}

export default connect(mapStateToProps) (HelloScreen)