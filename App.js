import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer, StackNavigator } from 'react-navigation';
import AddEntry from './components/AddEntry';
import DecksScreen from './components/DecksScreen'
import HelloScreen from './components/HelloScreen'
import HelloSecondScreen from './components/HelloSecondScreen'
import DeckCreateScreen from './components/DeckCreateScreen'
import SettingsScreen from './components/SettingsScreen';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'


const UdacyNavigator = createStackNavigator({
  Decks: DecksScreen,
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

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <RotNavigator />
      </Provider>
    )
  }
};