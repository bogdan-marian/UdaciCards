import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer, StackNavigator } from 'react-navigation';
import AddEntry from './components/AddEntry';
import Decks from './components/Decks'
import HelloScreen from './components/HelloScreen'
import HelloSecondScreen from './components/HelloSecondScreen'
import HomeScreen from './components/HomeScreen'
import SettingsScreen from './components/SettingsScreen';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'


const HelloNavigator = createStackNavigator({
  Hello: HelloScreen,
  HelloSecond: HelloSecondScreen
})

HelloNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
}

const AppNavigator = createBottomTabNavigator({
  Home: { screen: HelloNavigator },
  NewDeck: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home again Deck'
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