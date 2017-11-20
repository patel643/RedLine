import Expo from 'expo';
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import navigation, { StackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import FetchDemoScreen from './screens/FetchDemoScreen';

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  FetchDemo: {
    screen: FetchDemoScreen,
    navigationOptions: {
      headerTitle: 'Fetch Demo',
    },
  },
});

class App extends React.Component {

  render() {
    return <RootNavigator />
  }

}

Expo.registerRootComponent(App);
