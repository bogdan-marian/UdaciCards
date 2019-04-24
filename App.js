import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import AddEntry from './components/AddEntry';
import SettingsScreen from './components/SettingsScreen';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'


class HomeScreen extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home deck screen</Text>
        </View>
      </Provider>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  NewDeck: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Deck'
    }
  },
});

export default createAppContainer(TabNavigator);