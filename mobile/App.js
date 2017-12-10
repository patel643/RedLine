import Expo from 'expo';
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import navigation, { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { withAuth } from './Auth';

import AuthDemoScreen from './screens/AuthDemoScreen';
import HomeScreen from './screens/HomeScreen';
import FetchDemoScreen from './screens/FetchDemoScreen';


function NavigationContainer(props) {
  return(
    <View style={styles.container}>
      <StatusBar />
      {props.children}
    </View>
  )
}
const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Red Line',
    },
  },
  // AuthDemo: {
  //   screen: AuthDemoScreen,
  //   navigationOptions: {
  //     headerTitle: 'Auth Demo',
  //   },
  //
  // },
  // FetchDemo: {
  //   screen: FetchDemoScreen,
  //   navigationOptions: {
  //     headerTitle: 'Fetch Demo',
  //   },
  // },
});

class App extends React.Component {
  render() {
    // screenProps is one way to pass props to a navigator
    // https://reactnavigation.org/docs/navigators/navigation-options#Two-Ways-to-specify-each-option
    //return <RootNavigator screenProps={this.props} />
    return (
      <NavigationContainer>
        <HomeScreen screenProps={this.props}/>
      </NavigationContainer>

    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

Expo.registerRootComponent(withAuth(App));
