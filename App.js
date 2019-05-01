import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import AddEntry from './components/AddEntry';
import Decks from './components/Decks'
import SettingsScreen from './components/SettingsScreen';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'


export default class App extends React.Component {


  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View>
          <Decks />
        </View>
      </Provider>
    )
  }
}