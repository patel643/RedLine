const Router = createRouter(() => ({
   home: () => HomeScreen,
  about: () => AboutScreen,
 }));

 class HomeScreen extends React.Component {
    render() {
     return (
       <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
         <Text>HomeScreen!</Text>
        <Text onPress={this._goToAbout}>
          Push about route
        </Text>
       </View>
     )
   }

  _goToAbout = () => {
    this.props.navigator.push(Router.getRoute('about'));
  }
 }

 class AboutScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'About',
    }
  }

  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>AboutScreen!</Text>
        <Text onPress={this._goBackHome}>
          Go back home
        </Text>
      </View>
    )
  }

  _goBackHome = () => {
    this.props.navigator.pop();
  }
}
