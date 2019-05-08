import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/decks'

class DeckCreateScreen extends Component {
  state = {
    key: '',
    title: '',
    timeToNavigate: false
  }

  static navigationOptions = {
    title: 'Create new deck',
  };

  componentDidUpdate() {
    const { navigate } = this.props.navigation
    if (this.state.timeToNavigate) {
      navigate('Decks')
    }
  }

  stripSpaces(value) {
    return value.replace(/\s/g, '');
  }

  handleSubmit = () => {
    const { key, title } = this.state
    const { dispatch } = this.props

    let oldCount = Object.keys( this.props.decks).length
    
    dispatch(handleAddDeck(title))
    let newCoutn = Object.keys( this.props.decks).length
    (function checkAgain(){
      console.log("Check again")
      let newCoutn = Object.keys( this.props.decks).length 
      if (oldCount < newCoutn){
        setTimeout(checkAgain, 500)
      }
    })()


    //submitEntry({ key, entry })
    if (this.state.title ) {

      // this.setState(() => ({
      //   key: '',
      //   title: '',
      //   timeToNavigate: true
      // }))
    }
  }

  render() {



    let entries = this.props.entries
    let hackEntries = 'nothing to hack' //JSON.stringify(hackGetAll())

    return (
      <View >
        <Text>
          What is the title of your new deck?
        </Text>
        <TextInput
          placeholder="No name"
          defaultValue={this.state.title}
          onChangeText={(title) => {
            key = this.stripSpaces(title)
            this.setState({ title, key, timeToNavigate: false })
          }}
        />

        <Button
          disabled={!this.state.title}
          title="Create New Deck"
          onPress={() => (
            this.handleSubmit()
          )}
        />
      </View>
    )
  }

}

function mapStateToProps({decks}) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckCreateScreen)