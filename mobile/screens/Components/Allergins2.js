import React from 'react';
import {
 AppRegistry,
 StyleSheet,
 Text,
 ListView,
 Image,
 View
} from 'react-native';

import update from 'immutability-helper';
import {Font} from 'expo';
import {FontAwesome} from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import config from '../../config';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

class Allergins2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    dataArray:[],
    allergenDataSource: ds.cloneWithRows([]),
    fontsAreLoaded: false
  };
   this.sleep.bind(this);
   this.togglecheckbox.bind(this);
  }


  sleep() {
      var unixtime_ms = new Date().getTime();
      while(new Date().getTime() < unixtime_ms + 2000) {}
  }
  componentWillMount() {
    Font.loadAsync({
       "FontAwesome": require('../../node_modules/@expo/vector-icons/fonts/FontAwesome.ttf')
     }).then(()=>this.setState({ fontsAreLoaded: true }));
  }

  componentDidMount() {
      fetch(`${config.API_BASE}/api/db/allergens`)
    .then(response => response.json())
    .then((data) => {
    this.setState({
      dataArray:data,
     allergenDataSource: ds.cloneWithRows(data),

    })
   });
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return (<Text>Loading ... </Text>);
    }
    return (
     <ListView
      initialListSize={5}
      enableEmptySections={true}
      dataSource={this.state.allergenDataSource}
      renderRow={(allergen) => { return this.renderPersonRow(allergen) }} />

    );
  }


  togglecheckbox(allergenName,value){
    console.log(this.state.allergenDataSource)

     let oldArray = this.state.dataArray;
     let allergenIndex = oldArray.findIndex((allergen) => allergen.allergen_name === allergenName);

    let nextState = update(this.state.dataArray, {
                    [allergenIndex]: { selected: {$set: !value}}
                    });
    this.setState({dataArray: nextState,allergenDataSource:this.state.allergenDataSource.cloneWithRows(nextState)});

    //Update in db

    var userHeader = new Headers();
    //userHeader.append("username", this.props.profile.name);    //lastly call the api to add the task on the server
    userHeader.append("username","Kiran BR")
    userHeader.append('content-type', 'application/json');
    fetch(`${config.API_BASE}/api/db/allergens/${allergenName}`, {
      method: 'put',
      headers: userHeader,
      body: JSON.stringify({done: !value})
    }).then(response => response.json())
    .then((data) => console.log(data));
    }



  renderPersonRow(allergen) {
    return (
     <View style = {styles.listItemContainer}>
      <View style= {styles.iconContainer}>
       <Image source={{uri:allergen.image}} style={styles.initStyle} resizeMode='contain' />
      </View>
      <View style = {styles.allergenDetailsContainer}>
       <View style={styles.allergenDetailsContainerWrap}>

        <View style={styles.nameContainer}>
         <Text>{allergen.allergen_name}</Text>
        </View>

        <View style={styles.allergenIconContainer}>
        <CheckBox

                onPress={()=>this.togglecheckbox(allergen.allergen_name,allergen.selected)}
                checked={allergen.selected}
                size={23}
                containerStyle={{backgroundColor: '#F5FCFF',borderWidth: 0}}
                style={{ padding:0}}
        />

      </View>
     </View>
    </View>
   </View>
   )
  }

  }
  const styles = StyleSheet.create({
  listItemContainer: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  padding: 10
  },
  iconContainer: {
  flex: 1,
  alignItems: "flex-start"
  },
  allergenDetailsContainer: {
  flex: 4,
  justifyContent: "center",
  borderBottomColor: "rgba(92,94,94,0.5)",
  borderBottomWidth: 0.25
  },
  allergenDetailsContainerWrap: {
  flex: 1,
  alignItems: "center",
  flexDirection: "row"
  },
  nameContainer: {
  alignItems: "flex-start",
  flex: 1
  },
  dateContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
  },
  allergenIconContainer: {
  flex: 1,
  alignItems: "flex-end",
  },
  initStyle: {
  borderRadius: 30,
  width: 60,
  height: 60
  }
});
export default Allergins2;
