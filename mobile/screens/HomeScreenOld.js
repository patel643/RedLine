import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';


// example of using an expo Component
// https://docs.expo.io/versions/latest/sdk/keep-awake.html
import { KeepAwake ,Audio} from 'expo';





class HomeScreen extends React.Component {


  _handlePlaySoundAsync = async () => {
   await Audio.setIsEnabledAsync(true);
   let sound = new Audio.Sound();
   await sound.loadAsync({
     uri: 'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
   });
   await sound.playAsync();
 };

  render() {
    // console.log('HomeScreen props!', this.props)

    return (
      <View style={styles.container}>
        <Text style={styles.title}>home screen</Text>
        <View style={styles.spaced}>
          <Button
            onPress={() => this.props.navigation.navigate('FetchDemo')}
            title="fetch demo"
          />

        </View>

        <View style={styles.spaced}>
          <Button
            onPress={() => this.props.navigation.navigate('AuthDemo')}
            title="auth demo"
            style={styles.spaced}
          />

        </View>

        <View style={styles.spaced}>
        <Button
         title="Play a sound!"
         onPress={this._handlePlaySoundAsync}
       />
       </View>

        <Text style={styles.spaced}>(staying awake)</Text>
        <KeepAwake />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  spaced: {
    marginTop: 20,
  }
});

export default HomeScreen;
