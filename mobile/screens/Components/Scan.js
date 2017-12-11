import Expo from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ScanScreen from './ScanScreen.js';
import ScannedScreen from './ScannedScreen.js';

class Scan extends React.Component {

  render() {
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

export default Scan;
