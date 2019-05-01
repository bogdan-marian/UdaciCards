import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { submitEntry, hackGetAll } from '../utils/api'

class DeckCreateScreen extends Component {
  state = {
    key: '',
    title: ''
  }

  static navigationOptions = {
    title: 'Create new deck',
  };

  stripSpaces(value) {
    return value.replace(/\s/g, '');
  }

  handleSubmit = () => {
    const { key, title } = this.state
    const { dispatch } = this.props

    const entry = {
      deckTitle: title,
      questions: []
    }

    submitEntry({ key, entry })

    this.setState(() => ({
      key: '',
      title: ''
    }))

  }

  render() {
    let entries = this.props.entries
    let hackEntries = JSON.stringify(hackGetAll())

    return (
      <View >
        <Text>
          What is the title of your new deck?
        </Text>
        <TextInput
          placeholder="No name"
          onChangeText={(title) => {
            key = this.stripSpaces(title)
            this.setState({ title, key })
          }}
        />

        <Button
          title="Go to Home"
          onPress={() => (
            this.handleSubmit()
          )}
        />
        <Text>
          New tile is:  {this.state.title}
        </Text>
        <Text>
          New key is: {this.state.key}
        </Text>
        <Text>
          All entries: {JSON.stringify(entries)}
        </Text>
        <Text>
          Hack entries: {hackEntries}
        </Text>
      </View>
    )
  }
}

function mapStateToProps({ entries }) {
  return {
    entries: entries
  }
}

export default connect(mapStateToProps)(DeckCreateScreen)