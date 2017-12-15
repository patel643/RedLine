import Expo from 'expo';
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import navigation, { StackNavigator } from 'react-navigation';

import { withAuth } from './Auth';
import {Constants} from 'expo';

import AuthDemoScreen from './screens/AuthDemoScreen';
import HomeScreen from './screens/HomeScreen';
import FetchDemoScreen from './screens/FetchDemoScreen';
import ScanScreen from './screens/Components/ScanScreen.js';
import ScannedScreen from './screens/Components/ScannedScreen.js';
import Landing from './screens/LandingScreen.js';
import config from './config.js';


const ScansScreen = ({ navigation }) => (
  <ScanScreen navigation={navigation}/>
);
const ScannedScreens = () => (
  <ScannedScreen />
);
const RootNavigator = StackNavigator({
          Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null,
              },
          },

          Scans: {
            screen: ScansScreen,  navigationOptions: {
                header: null,
              },

          },

          AfterScan: {
            screen: ScannedScreens,
            navigationOptions: {
              header: null,
            },
          },
        },

          {
                navigationOptions: {
                headerMode: 'screen',
          }
});

function NavigationContainer(props) {
 return(
   <View style={styles.container}>
     <StatusBar />
     {props.children}
   </View>
 )
}


class App extends React.Component {
   constructor(props){
     super(props);
     this.state = {
       loginstatus: false,
   }
 }

 modifyLoginStatus(){
   const {login, logout} = this.props;
   if(this.props.screenProps.profile.name){
    // logout();
     this.setState({loginstatus: false});
   }
   else{
     //login();
     this.setState({loginstatus: true});
   }

 }

 
render() {
        // screenProps is one way to pass props to a navigator
        // https://reactnavigation.org/docs/navigators/navigation-options#Two-Ways-to-specify-each-option

        const {profile, login, logout, getAuthorizationHeader} = this.props;
        if(!!profile){
        var userHeader = new Headers();
        userHeader.append("username", profile.name);
        fetch(`${config.API_BASE}/api/db/createuser`,{headers:userHeader})
            .then((response) => response.json())
            .then((responseJson) => {
              console.log('created user', JSON.stringify(responseJson));

            })
            .catch((error) => {
              console.error(error);
            });
          }


        if(this.props.profile.name){
          return (<NavigationContainer><RootNavigator screenProps={this.props} /></NavigationContainer>);
        }
        else{
          return <Landing screenProps={this.props}/>
        }
      }
}



const styles = StyleSheet.create({
       container: {
         flex: 1,
         paddingTop: Constants.statusBarHeight,
       }
});

Expo.registerRootComponent(withAuth(App));
