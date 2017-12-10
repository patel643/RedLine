import React from 'react';
import {
 AppRegistry,
 StyleSheet,
 Text,
 ListView,
 Image,
 View
} from 'react-native';
//import { fetch } from 'fetch';
import {Font} from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
// import { CheckBox } from 'react-native-elements';
import config from '../../config';







const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

class Allergins extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    allergenDataSource: ds.cloneWithRows([]),
    loaded: false
   }
   this.togglecheckbox.bind(this);
  }
  componentWillMount() {
   Font.loadAsync(FontAwesome.font);
  }
  render() {
    return (
     <ListView
      initialListSize={5}
      enableEmptySections={true}
      dataSource={this.state.allergenDataSource}
      renderRow={(allergen) => { return this.renderAllergenRow(allergen) }} />
     )
  }
  togglecheckbox(allergenName){
    let allergenIndex = this.state.allergenDataSource.findIndex((allergen) => allergen.allergen_name === allergenName);
    //Save ref to tasks's 'done' value
    let newValue;
    // $apply to change done value to opposite
    let nextState = update(this.state.allergen, {
                          [allergenIndex]: {

                          selected: {$apply: (value)=>{
                                    newValue = !value;
                                    return newValue;
                              }
                            }
                          }
                        });
        this.setState({allergenDataSource: nextState});
        var userHeader = new Headers();
        //userHeader.append("username", this.props.profile.name);    //lastly call the api to add the task on the server
        userHeader.append("username","Kiran BR")
        userHeader.append('content-type', 'application/json');
        fetch(`${config.API_BASE}/api/db/allergens/${allergenName}`, {
          method: 'put',
          headers: userHeader,
          body: JSON.stringify({done: newDoneValue})
        });
  }
  renderAllergenRow(allergen) {
    return (
     <View style = {styles.listItemContainer}>
      <View style= {styles.iconContainer}>
       <Image source={{uri:allergen.image}} style={styles.initStyle} resizeMode='contain' />
      </View>
      <View style = {styles.callerDetailsContainer}>
       <View style={styles.callerDetailsContainerWrap}>
        <View style={styles.nameContainer}>
         <Text>{allergen.allergen_name}</Text>

        </View>
        <View style={styles.callIconContainer}>

       //  <CheckBox
       //   checked={allergen.selected}
       //   onPress={() => togglecheckbox(allergenName)}
       // />

      </View>
     </View>
    </View>
   </View>
   )
  }
  componentDidMount() {


    //var userHeader = new Headers();
    //userHeader.append("username", this.props.screenProps.user.name);
    //userHeader.append("username","Kiran BR");
    let myRequest = new Request(`${config.API_BASE}/api/db/allergens`, {
      method: 'GET',
      // this header sends the user token from auth0
      // headers: getAuthorizationHeader()
    });
    // console.log('request', myRequest);

    // fetch(myRequest)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw Error(response.statusText);
    //     }
    //     return response;
    //   })
    //   .then(res => res.json())
    //   .then(json => {
    //     this.setState({allergensDataSource: ds.cloneWithRows(json),loaded:true});
    //   })
    //   .catch(error => {
    //
    //     this.setState({allergensDataSource: [],loaded:false});
    //   });

 //    fetch('https://gist.githubusercontent.com/yllongboy/152a6f163b07dfb315f34fa55becda96/raw/6337b0bac10215955030b69640eb3a076d7953bd/whatsapp_calls.json')
 //  .then(response => response.json())
 //  .then((data) => {
 //  this.setState({
 //   allergenDataSource: ds.cloneWithRows(data),
 //   loaded: true
 //  })
 // });
 fetch(`${config.API_BASE}/api/db/allergens`)
.then(response => response.json())
.then((data) => {this.setState({allergensDataSource: ds.cloneWithRows(json),loaded:true});});

    // fetch(`${config.API_BASE}/api/db/allergens`)
    // .then(response => response.json())
    // .then(json => {this.setState({allergensDataSource: ds.cloneWithRows(json),loaded:true});});

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
  callerDetailsContainer: {
  flex: 4,
  justifyContent: "center",
  borderBottomColor: "rgba(92,94,94,0.5)",
  borderBottomWidth: 0.25
  },
  callerDetailsContainerWrap: {
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
  callIconContainer: {
  flex: 1,
  alignItems: "flex-end"
  },
  initStyle: {
  borderRadius: 30,
  width: 60,
  height: 60
  }
});
export default Allergins;
