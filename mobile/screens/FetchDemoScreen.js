import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import config from '../config'

class FetchDemoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'no message yet'
    }
  }

  componentDidMount() {

    fetch(`${config.API_BASE}/`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('fetched:', JSON.stringify(responseJson));
        this.setState({message: responseJson.message});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    return (
      <View>
        <Text>fetch demo</Text>
        <Text>message: {this.state.message}</Text>
      </View>
    );
  }

}

export default FetchDemoScreen;
