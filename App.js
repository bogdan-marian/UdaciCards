import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import AddDeck from './components/AddDeck';
import SettingsScreen from './components/SettingsScreen';


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home deck screen</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  NewDeck: { 
    screen: AddDeck ,
    navigationOptions: {
      tabBarLabel: 'Add Deck'
    }
  },
});

export default createAppContainer(TabNavigator);