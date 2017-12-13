import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CollapsingHeader from './CollapsingHeader.js';



class About extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'no message yet',
      authStatus: 'not tested yet',
    }
  }


  render() {
    return (
        <View>
        <Text>About Page</Text>
        </View>

    );
  }

}

export default About;
