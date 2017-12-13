
import Expo from 'expo';
import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {Font} from 'expo';
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';
import dbdata from './dbdata.json'

import Style from './Style.js';
import Panel from './Panel.js';
import CollapseData from './CollapseData.js';


const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class CollapsingHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      info: this.props.info,
      data: this.props.data,
      values: [],
      contains: false
    };
  }
  componentWillMount(){
    Font.loadAsync(MaterialIcons.font);
    Font.loadAsync(FontAwesome.font);

    val=this.props.info.allergens.map((allergens) =>
      ( allergens.allergen_value)
    );
    this.setState({values: val});
    var temp=false;
    val.map((d, i) =>{
      if((parseInt(d,10))>0)
        temp=true;
    })
    this.setState({contains: temp})


  }


  _renderScrollViewContent() {
    console.log(this.state.values);

    console.log(this.state.contains);
    return (
       <View style={styles.scrollViewContent}>

          <CollapseData navigation={this.props.navigation} info={this.props.info} contains={this.state.contains}/>

    </View>
    );
  }

  render() {
    if(this.state.contains == false)
      var img=require('./images/check.gif');
    if(this.state.contains == true)
      var img=require('./images/danger.gif');

    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });
console.log(img);
    return (
      <View style={styles.fill}>
         <StatusBar
              translucent
              barStyle="light-content"
              backgroundColor="rgba(0, 0, 0, 0.251)"
            >

</StatusBar>
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >

          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}

              source={img}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
        <FontAwesome name={'arrow-left'} size={24} color="grey" onPress={() => this.props.navigation.navigate('Home')}>

          </FontAwesome>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#191970',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
     flex: 1,
     flexDirection: "row",
     justifyContent: "space-between",
     backgroundColor: "#191970",
     alignItems:"center",

  },
  leftHeaderContainer: {
     alignItems: "flex-start",
     flexDirection: "row"
  },
  rightHeaderContainer: {
     alignItems: "flex-end",
     flexDirection: "row"
  },
});
