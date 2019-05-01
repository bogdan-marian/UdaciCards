import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
class HelloScreen extends Component {
  static navigationOptions = {
    title: 'HelloScreen',
  };

  render() {
    return (
      <View style={{ paddingTop: 20 }}>
        <Text >
          Hello from simple HELLO
        </Text>
        <Button 
          style={{ marginRight: 'auto'}}
          title="Go to seccond hello"
          onPress={()=> this.props.navigation.navigate('HelloSecond')}
        />
      </View>
    )
  }
}

export default HelloScreen