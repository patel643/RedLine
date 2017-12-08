import React from 'react';
import {StyleSheet,Text,View,Image} from 'react-native';
import {Font} from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import ScrollableTabView from 'react-native-scrollable-tab-view'



import Allergins from '../screens/Components/Allergins.js';
import About from '../screens/Components/About.js';
import ScanScreen from '../screens/Components/Scan.js';



class HomeScreen extends React.Component {
  componentWillMount() {
   Font.loadAsync(MaterialIcons.font);
  }

  render() {

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
            <MaterialIcons name="menu" size={32} color="green" />
           </View>
        </View>

           <View style={styles.contentContainer}>
               <ScrollableTabView
                     tabBarUnderlineColor="#fff"
                     tabBarUnderlineStyle={{backgroundColor: "#fff"}}
                     tabBarBackgroundColor ="#8e0000"
                     tabBarActiveTextColor="#fff"
                     tabBarInactiveTextColor="#88b0ac">

                      <ScanScreen tabLabel="SCAN" {...this.props} />
                      <Allergins tabLabel="ALLERGENS" {...this.props} />
                      <About tabLabel="ABOUT" {...this.props} />
                </ScrollableTabView>

           </View>

     </View>
   );
   }
}

  const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      height: 24
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
  });
//<Text style={styles.logoText}>RedLine</Text>
export default HomeScreen;
