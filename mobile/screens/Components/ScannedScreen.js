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
  Image
} from 'react-native';
import {Font, Expo} from 'expo';
import config from '../../config';
import CollapsingHeader from './CollapsingHeader';
import ScanScreen from './ScanScreen.js';
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';


class ScannedScreen extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
     code: this.props.code.slice(1),
     info: [],
     isFirstRender: true,
     data: [],
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

      })
     .then(res => JSON.parse(res._bodyInit))
      .then(body => {
        this.setState({info: body});
      })
      .catch(function (error) {
          console.log(error);
        });



}

componentDidMount() {

  let request = new Request(`${config.API_BASE}/api/db/allergens`, {
             method: 'GET',
             headers: {
                 "Content-Type": "application/json"
             },
         });
         console.log("myRequest: ", request);

         fetch(request).then(response => response.json())
         .then((data) => console.log("data: ",data));

}

  render() {
    if(this.state.isFirstRender == true){
      <View>
      <Text>Loading...</Text>
      </View>
    }
    if(!this.state.info.upc){
        return (
          <View style={styles.container}>
             <FontAwesome name={'arrow-left'} size={24} color="grey" onPress={() => this.props.navigation.navigate('Home')}/>
             <Text>Hmmm, are you sure you scanned a food product......</Text>
             <Image source={require('./images/error.png')}></Image>

          </View>
        );
      }
    if(this.state.info.upc){
      console.log("From Scanned screen" + JSON.stringify(this.props.screenProps))
      return(
        <View style={styles.container}>
          <CollapsingHeader navigation={this.props.navigation} info={this.state.info} data={this.state.data} screenProps={this.props.screenProps}/>
        </View>
      );
    }


  }

}


var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    if (typeof obj !== "object") return true;

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
