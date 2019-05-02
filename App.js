import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer, StackNavigator } from 'react-navigation';
import AddEntry from './components/AddEntry';
import DecksScreen from './components/DecksScreen'
import DeckScreen from './components/DeckScreen'
import HelloScreen from './components/HelloScreen'
import HelloSecondScreen from './components/HelloSecondScreen'
import DeckCreateScreen from './components/DeckCreateScreen'
import SettingsScreen from './components/SettingsScreen';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import reducer from './reducers'
import {handleInitialData} from './actions/shared'
import middleware from './middleware'

const HelloNavigator = createStackNavigator({
  Hello: HelloScreen
})

const UdacyNavigator = createStackNavigator({
  Decks: DecksScreen,
  Deck: DeckScreen
})

UdacyNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
}

const AppNavigator = createBottomTabNavigator({
  Home: { screen: UdacyNavigator },
  NewDeck: {
    screen: createStackNavigator({ DeckCreate: DeckCreateScreen }),
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  },
})

const RotNavigator = createAppContainer(AppNavigator)

const store = createStore(reducer, middleware)

class App extends React.Component {
  componentDidMount(){
    store.dispatch(handleInitialData())
  }

  render() {
    return (
      <Provider store={store}>
        <RotNavigator />
      </Provider>
    )
  }
}

export default (App)
