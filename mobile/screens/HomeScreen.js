import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';


class HomeScreen extends React.Component {

  render() {
    // console.log('HomeScreen props!', this.props)

    return (
      <View style={styles.container}>
        <Text style={styles.title}>home screen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('FetchDemo')}
          title="fetch demo"
        />
        <Button
          onPress={() => this.props.navigation.navigate('AuthDemo')}
          title="auth demo"
        />
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
    marginBottom: 40,
  },
});

export default HomeScreen;
