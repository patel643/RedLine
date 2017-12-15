import React from 'react';
import {StyleSheet,Text,View,Image,Button} from 'react-native';
import {Font, Expo} from 'expo';
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from 'react-native-elements';


import Allergins2 from '../screens/Components/Allergins2.js';
import About from '../screens/Components/About.js';
import ScanScreen from '../screens/Components/ScanScreen.js';
import config from '../config.js';


class HomeScreen extends React.Component {

  componentWillMount() {
   Font.loadAsync(MaterialIcons.font);
   Font.loadAsync(FontAwesome.font);

  }

  render() {
  console.log("Again here" + this.props.screenProps.profile);
  const {login,logout,getAuthorizationHeader,profile} = this.props.screenProps;
  var loginButton,contentComponent;

 //What content to show is decided here?
  if (!profile) {
    contentComponent =  <Text>dummy</Text>
  } else {
    contentComponent =   <ScrollableTabView
            tabBarUnderlineColor="#fff"
            tabBarUnderlineStyle={{backgroundColor: "#fff"}}
            tabBarBackgroundColor ="#8e0000"
            tabBarActiveTextColor="#fff"
            tabBarInactiveTextColor="#88b0ac">

             <ScanScreen tabLabel="SCAN" {...this.props} />
             <Allergins2 tabLabel="ALLERGENS" {...this.props} />
             <About tabLabel="ABOUT" {...this.props} />
       </ScrollableTabView>
  }

   return (
            <View style={styles.mainContainer}>
              <Text>You are identified as {JSON.stringify(this.props.screenProps.profile.name)}</Text>

              {/* header container */}
               <View style={styles.headerContainer}>
                  <View style={styles.leftHeaderContainer}>
                        <Image
                          style={{width: 80, height: 50,backgroundColor: "white",margin:7 , marginTop:12,borderRadius:2,borderColor:"red",borderRadius: 4}}
                          source={require('./Components/images/icon2.png')}
                          resizeMode="contain"
                        />
                  </View>
                  <View style={styles.rightHeaderContainer}>

                  </View>
              </View>

              {/* body container */}
              <View style={styles.contentContainer}>
                {contentComponent}
              </View>

          </View>
      );
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
   textContainer:{
     margin:5,
     alignItems:"flex-end",
     width: 80,
     height: 40,
     margin:7 ,
     marginTop:12,
     justifyContent:'center',
     borderRadius:2,
     borderWidth:1,
     borderColor:"white",
     backgroundColor: "#F5FCFF",
     borderRadius: 4
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
