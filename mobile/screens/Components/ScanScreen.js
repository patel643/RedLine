import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Dimensions,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {BarCodeScanner} from 'expo';
import ScannedScreen from './ScannedScreen.js';

class ScanScreen extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        code: '',
      };
    }

  render() {

    if(!!(this.state.code != '')){
    return (
      <View style={styles.container}>
      <ScannedScreen code={this.state.code}  navigation={this.props.navigation} />

      </View>
      );
  }
    if(!!(this.state.code == '')){
      return (
        <View style={styles.container}>
        <BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={styles.container}
              />
          </View>
        );
    }

}

  _handleBarCodeRead = info => {
    this.setState({code : JSON.stringify(info.data)});
 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default ScanScreen;
