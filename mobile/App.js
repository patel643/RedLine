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

import { withAuth } from './Auth';
import {Constants} from 'expo';

import AuthDemoScreen from './screens/AuthDemoScreen';
import HomeScreen from './screens/HomeScreen';
import FetchDemoScreen from './screens/FetchDemoScreen';

import ScanScreen from './screens/Components/Scan.js';
import ScannedScreen from './screens/Components/Scanned.js';
const ScansScreen = ({ navigation }) => (
  <ScanScreen navigation={navigation}/>
);

const ScannedScreens = () => (
  <ScannedScreen />
);

const RootNavigator = StackNavigator({
            Home: {
              screen: HomeScreen,
              navigationOptions: {
                  header: null,
                },
            },

          Scans: {
            screen: ScansScreen,  navigationOptions: {
                header: null,
              },

          },
          AfterScan: {
            screen: ScannedScreens,
            navigationOptions: {
              header: null,
            },
          },
        },
          {
                navigationOptions: {
                  headerMode: 'screen',
                }
});

function NavigationContainer(props) {
 return(
   <View style={styles.container}>
     <StatusBar />
     {props.children}
   </View>
 )
}
class App extends React.Component {
  render() {
    // screenProps is one way to pass props to a navigator
    // https://reactnavigation.org/docs/navigators/navigation-options#Two-Ways-to-specify-each-option
    return (
      <NavigationContainer><RootNavigator screenProps={this.props} /></NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
 container: {
   flex: 1,
   paddingTop: Constants.statusBarHeight,
 }
});

Expo.registerRootComponent(withAuth(App));
