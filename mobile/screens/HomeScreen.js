import React from 'react';
import {StyleSheet,Text,View,Image,Button} from 'react-native';
import {Font, Expo} from 'expo';
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from 'react-native-elements'

import Allergins2 from '../screens/Components/Allergins2.js';
import About from '../screens/Components/About.js';
import ScanScreen from '../screens/Components/Scan.js';
import Appl from '../screens/Components/ScanNav.js';

// import Login from '../screens/Components/Login.js';

import config from '../config.js';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authStatus: 'not tested yet',
    }
  }
  componentWillMount() {
   Font.loadAsync(MaterialIcons.font);
   Font.loadAsync(FontAwesome.font);

  }
  componentDidMount(){
    const {getAuthorizationHeader} = this.props.screenProps;

    // creating user

    var userHeader = new Headers();
    //userHeader.append("username", this.props.screenProps.user.name);
    userHeader.append("username","Kiran BR");
      // fetch(`${config.API_BASE}/api/db/createuser`,{headers:userHeader})
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //     console.log('created user', JSON.stringify(responseJson));
      //
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      }



  render() {
  const {profile, login, logout, getAuthorizationHeader} = this.props.screenProps;
  const msg = (!profile) ? <Text>hi</Text> : <Text>hi {profile.name}</Text>
   if(!profile){
     return (
           <View style={styles.mainContainer}>
              <View style={styles.headerContainer}>
                 <View style={styles.leftHeaderContainer}>
                 <Image
                   style={{width: 80, height: 50,backgroundColor: "white",margin:7 , marginTop:12,borderRadius:2,borderColor:"red",borderRadius: 4}}
                   source={require('./icon2.png')}
                   resizeMode="contain"
                 />
                 </View>

                 <View style={styles.rightHeaderContainer}>
                 <FontAwesome name={'sign-in'} size={32} color="white" onPress={login}/>
                 </View>
              </View>
              <View style={styles.contentContainer}>
              </View>
          </View>
        );
    }

    if(profile){
      return (
            <View style={styles.mainContainer}>
               <View style={styles.headerContainer}>
                  <View style={styles.leftHeaderContainer}>
                  <Image
                    style={{width: 80, height: 50,backgroundColor: "white",margin:7 , marginTop:12,borderRadius:2,borderColor:"red",borderRadius: 4}}
                    source={require('./icon2.png')}
                    resizeMode="contain"
                  />

                  </View>

                  <View style={styles.rightHeaderContainer}>
                    <FontAwesome name={'sign-out'} size={32} color="white" onPress={logout} />
                   </View>
               </View>

                  <View style={styles.contentContainer}>
                      <ScrollableTabView
                            tabBarUnderlineColor="#fff"
                            tabBarUnderlineStyle={{backgroundColor: "#fff"}}
                            tabBarBackgroundColor ="#8e0000"
                            tabBarActiveTextColor="#fff"
                            tabBarInactiveTextColor="#88b0ac">

                             <Appl tabLabel="SCAN" {...this.props} />
                             <Allergins2 tabLabel="ALLERGENS" {...this.props} />
                             <About tabLabel="ABOUT" {...this.props} />
                       </ScrollableTabView>
                  </View>
            </View>

      );
    }

   }
}

  const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      height: 24,
   },
   headerContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#d50000",
      alignItems:"center",
      paddingRight: 5
   },
   leftHeaderContainer: {
      alignItems: "flex-start",
      flexDirection: "row"
   },
   rightHeaderContainer: {
      alignItems: "flex-end",
      flexDirection: "row"
   },
   contentContainer: {
      flex: 6,
   },
   logoText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
      alignItems: "flex-start",
      marginLeft: 10
   },
   text: {
    fontSize: 19
  },
  icon: {
    fontSize: 19
  }
  });

export default HomeScreen;
