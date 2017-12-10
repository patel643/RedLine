import Expo from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ScanScreen from './Scan.js';
import ScannedScreen from './Scanned.js';

class Appl extends React.Component {

  render() {
    console.log("foo");
    return (
        <RootNavigator navigation={this.props.navigation}/>

    );
  }

}

const HomeScreen = ({ navigation }) => (
  <ScanScreen navigation={navigation}/>
);

const DetailsScreen = () => (
  <ScannedScreen />
);

const RootNavigator = StackNavigator({

  Home: {
    screen: HomeScreen,  navigationOptions: {
        header: null,
      },

  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      header: null,
    },
  },
},{
      navigationOptions: {
        headerMode: 'screen',
      }
    });



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Appl;
