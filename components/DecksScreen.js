import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DecksScreen extends Component {

  static navigationOptions = {
    title: 'Udaci Cards',
  };

  getDeckArray(deck) {
    let deckArray = []
    Object.entries(deck).forEach(entry => {
      let key = entry[0];
      let value = entry[1];
      deckArray.push(value)
    });
    return deckArray
  }

  render() {

    let myDecks = this.getDeckArray(this.props.decks)

    return (
      <View style={styles.container} >


        <Text>Total number of kecks: {myDecks.length}</Text>
        <FlatList
          data={myDecks}
          keyExtractor={item => item.id}

          renderItem={({ item }) =>
            <TouchableOpacity
              style={styles.flatview}
              onPress={()=> this.props.navigation.navigate('Deck',{ item:item})}
            >
              <Text style={styles.deck}>Deck: {item.title}</Text>
              <Text style={styles.total}>({item.questions.length} cards)</Text>
            </TouchableOpacity>
          }
        />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h2text: {
    marginTop: 10,
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  deck: {
    fontSize: 18
  },
  total: {
    alignSelf: 'flex-end'
  },
  email: {
    color: 'red'
  }

});

function mapStateToProps({ decks }) {
  return {
    decks: decks
  }
}

export default connect(mapStateToProps)(DecksScreen)