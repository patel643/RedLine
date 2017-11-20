import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';


class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>home screen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('FetchDemo')}
          title="fetch demo"
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
  },
});

export default HomeScreen;
