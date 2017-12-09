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

class ScannedScreen extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
     code: this.props.code.slice(1),
     info: [],
   };
  }

  componentWillMount(){
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
        this.setState({info: JSON.stringify(body)});
      })
      .catch(function (error) {
          console.log(error);
        });

}

  render() {

    return (
      <View style={styles.container}>

            <Text>{this.state.info}</Text>
        </View>
      );
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

export default ScannedScreen;
