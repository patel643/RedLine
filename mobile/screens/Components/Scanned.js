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
import Scan from './Scan.js'
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';


class ScannedScreen extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
     code: this.props.code.slice(1),
     info: [],
   };
  }

  componentWillMount(){
    Font.loadAsync(MaterialIcons.font);
    Font.loadAsync(FontAwesome.font);
    var c=parseInt(this.state.code, 10);
      fetch('http://api.foodessentials.com/label?u=0'+c+'&sid=af520b23-4799-4a54-bc94-488484fa8ac0&appid=demoApp_01&f=json&long=38.6300&lat=90.2000&api_key=8bq3c9m8shgu9zc3w6sz24ac',
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type":"application/json"
        },
        //body: JSON.stringify(new_req)

      })
     .then(res => JSON.parse(res._bodyInit))
      .then(body => {
        this.setState({info: body});
        console.log(this.state.info.upc);
      })
      .catch(function (error) {
          console.log(error);
        });

}

  render() {

    if(!this.state.info.upc){
        return (
          <View style={styles.container}>
             <FontAwesome name={'arrow-left'} size={24} color="grey" onPress={() => this.props.navigation.navigate('Home')}/>

          </View>
          );
      }
    if(this.state.info.upc){
      return(
        <View style={styles.container}>
          <CollapsingHeader navigation={this.props.navigation}/>
        </View>
      );
    }


  }

}


var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
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

export default ScannedScreen;
