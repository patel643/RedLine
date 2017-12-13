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
import {Font, Expo} from 'expo';

import CollapsingHeader from './CollapsingHeader';
import ScanScreen from './ScanScreen.js';
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';


class AfterScan extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
     info: this.props.info,
     upc: this.props.info.upc,
   };
   console.log(this.props.info.upc);
  }

  componentWillMount(){
    Font.loadAsync(MaterialIcons.font);
    Font.loadAsync(FontAwesome.font);

}

  render() {

    if(!this.props.info.upc){
        return (
          <View style={styles.container}>
             <FontAwesome name={'arrow-left'} size={24} color="grey" onPress={() => this.props.navigation.navigate('Home')}/>

          </View>
          );
      }
    if(this.props.info.upc){
      return(
        <View style={styles.container}>
          <CollapsingHeader navigation={this.props.navigation} info={this.state.info}/>
        </View>
      );
    }


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

export default AfterScan;
