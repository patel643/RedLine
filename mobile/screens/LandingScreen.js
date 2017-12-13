import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { withAuth } from '../Auth';

export default class AuthDemoScreen extends React.Component {

  render() {
    const {profile, login, logout, getAuthorizationHeader} = this.props.screenProps;

        return (

            <Image
                source={require('../landing2.png')}
                resizeMode="stretch"
                style = {styles.container}
                >
                <Button onPress={login}
                    title="Login"
                    fontSize="40"
                    color="brown"
                    textShadowColor="green"
                />
            </Image>

          )


  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: undefined,
      height: undefined,
      backgroundColor:'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },

  });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //backgroundColor: '#fff',
    // //backgroundImage: 'url()',
    // alignItems: 'center',

//});
