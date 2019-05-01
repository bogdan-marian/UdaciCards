import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class Decks extends Component {
  render() {
    return (
      <View style={{ paddingTop: 20 }}>
        <Text>
          Hello from Decks component
        </Text>
        <Text>Entries: 
          {this.props.entrie}
        </Text>
      </View>
    )
  }
}

function mapStateToProps({ entries }) {
  return {
    entries: Object.keys(entries)
  }
}

export default connect(mapStateToProps)(Decks)