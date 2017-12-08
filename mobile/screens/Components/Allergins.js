import React from 'react';
import {
 AppRegistry,
 StyleSheet,
 Text,
 ListView,
 Image,
 View
} from 'react-native';
import { fetch } from 'fetch';
import { MaterialIcons } from '@expo/vector-icons';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})

class Allergins extends React.Component {
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
        <Text>Allergins Page</Text>
      </View>
    );
  }
}
export default Allergins;
