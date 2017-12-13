// import React from 'react';
// import {
//   Button,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import CollapsingHeader from './CollapsingHeader.js';
//
//
//
// class About extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       message: 'no message yet',
//       authStatus: 'not tested yet',
//     }
//   }
//
//
//   render() {
//     return (
//         <View>
//         <Text>About Page</Text>
//         </View>
//
//     );
//   }
//
// }
//

import React, { Component } from 'react';
import { AppRegistry, StatusBar, View, Image, Animated, Platform } from 'react-native';
import { Pages } from 'react-native-pages';

let imageStyle = {
  width: null,
  height: null,
  resizeMode: 'cover',
  flex: 1,
};

let viewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
};

let textStyle = {
  backgroundColor: 'transparent',
  textAlign: 'center',
  fontSize: 24,
};

let indexStyle = {
  fontSize: 10,
  color: 'rgba(255, 255, 255, .63)',
};

Platform.select({
  ios: () => StatusBar.setBarStyle('light-content'),
  android: () => StatusBar.setBackgroundColor('#263238'),
})();

/* eslint-disable react/prop-types */

let Label = ({ color, backgroundColor, text, effect, index, pages, progress }) => {
  let style = { ...textStyle, color };

  switch (effect) {
    case 'skew':
      style.transform = [{
        skewX: progress.interpolate({
          inputRange: [-0.75, 0, 0.75],
          outputRange: ['45deg', '0deg', '-45deg'],
        }),
      }];
      break;

    case 'rise':
      style.transform = [{
        translateY: progress.interpolate({
          inputRange: [-0.5, 0, 0.5],
          outputRange: [50, 0, -50],
        }),
      }];

      style.opacity = progress.interpolate({
        inputRange: [-0.5, 0, 0.5],
        outputRange: [0, 1, 0],
      });
      break;

    case 'zoom':
      style.transform = [{
        scale: progress.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [4, 1, 0],
        }),
      }];

      style.opacity = progress.interpolate({
        inputRange: [-0.25, 0, 1],
        outputRange: [0, 1, 1],
      });
      break;

    case 'flip':
      style.transform = [{
        rotate: progress.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: ['360deg', '0deg', '-360deg'],
        }),
      }];
      break;

    case 'slide':
      style.transform = [{
        translateX: progress.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-100, 0, 100],
        }),
      }];
      break;
  }

  return (
    <View style={[viewStyle, { backgroundColor }]}>
      <Animated.Text style={style}>
        {text}
        {'\n'}
        <Animated.Text style={indexStyle}>{`[${index + 1} / ${pages}]`}</Animated.Text>
      </Animated.Text>
    </View>
  );
};

/* eslint-enable */

class About extends Component {
    render() {
      return (
        <View style={{ flex: 1, backgroundColor: '#263238' }}>
          <Pages>
            <Label color='#FFF59D' backgroundColor='#607D8B' text='Choosing the right product cant get simpler than this!' effect='skew' />
            <Label color='#B2FF59' backgroundColor='#546E7A' text='Mark your allergens in ALLERGENS tab' effect='rise' />
            <Label color='#81D4FA' backgroundColor='#455A64' text='Scan to inspect!'  effect='zoom' />
            <Label color='#F44336' backgroundColor='#37474F' text='BINGO!!!You know if it belongs in your shelf' effect='flip' />
          </Pages>

        </View>
      );
    }
  }
export default About;
