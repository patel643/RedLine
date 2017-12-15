import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Dimensions,
  TouchableHighlight,
  Alert,
  ScrollView,
  Image,
} from 'react-native';

import {Font} from 'expo';
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';
//import dbdata from './dbdata.json'

import Style from './Style.js';
import Panel from './Panel.js';
import config from '../../config';

export default class CollapseData extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        code: '',
        uall: [],
        oall: [],
        addit: []
      };
    }

    componentWillMount(){
      Font.loadAsync(MaterialIcons.font);
      Font.loadAsync(FontAwesome.font);
      var present= [];
      var notsel= [];

      const {profile} = this.props.screenProps;
      console.log("CHecking Profile"+JSON.stringify(this.props));
      if(!!profile){
      console.log("Hey THERE PROFILE DETAILS PRESENT >>>> TRYING TO FETCH");
      var userHeader = new Headers();
      userHeader.append("username", profile.name);
      fetch(`${config.API_BASE}/api/db/allergens`,{headers: userHeader})
      .then(response => response.json())
      .then((data) => {
        var dbdata = data;
        //All old
        this.props.info.allergens.map((allergens) =>{
          dbdata.map((data) =>  {
            console.log("Printing dbdata at component will mount "+ data.allergen_name +"\n");
            if(!!(data.allergen_name === allergens.allergen_name) && (data.selected === true) && ((parseInt(allergens.allergen_value,10)) > 0))
              present= present.concat(" "+allergens.allergen_name+"\n")
              if(!!(data.allergen_name === allergens.allergen_name) && (data.selected === false) && ((parseInt(allergens.allergen_value,10)) > 0))
                notsel= notsel.concat(" "+allergens.allergen_name+"\n")
            }
        )}
        );
        console.log("present: "+present);
        this.setState({uall: present});
        console.log("others: "+notsel);
        this.setState({oall: notsel });
        var adds=[];
        this.props.info.additives.map((add) =>{
            if((parseInt(add.additive_value,10)) > 0)
              adds= adds.concat(" "+add.additive_name+"\n")
        }
        );
        console.log("additives: "+adds);
        this.setState({addit: adds });

        //All old code

     });
    }



    }


  render() {
    if(!this.props.contains){
      var dis1= <Text style={Style.list_sub_header}>Yay! This product is safe for your consumption</Text>
    }
    if(this.props.contains){
      var dis1= <Text style={Style.list_item}>
      {this.state.uall.map((uall, i) => (
          <Text key={i}>{i+1}. {uall}</Text>
      ))}
      </Text>
    }
    return(
      <View>

          <Panel title="Your Allergens">
          <View style={{flex: 1, flexDirection: 'row'}}>
               <View style={{flex: .5, flexDirection: 'column'}} >
                  {dis1}
               </View>
               <View style={{flex: .5}} >
                 <Image source={require('./images/all.jpg')}
               />
               </View>
          </View>
          </Panel>

          <Panel title="Other Allergens">
          <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: .5, flexDirection: 'column'}} >

                  <Text style={Style.list_item}>
                 {this.state.oall.map((oall, i) => (
                     <Text key={i}>{i+1}. {oall}</Text>
                 ))}
                 </Text>
                  </View>
               <View style={{flex: .5}} >
                 <Image source={require('./images/oth.jpg')}
               />
               </View>
          </View>
          </Panel>

          <Panel title="Additives">
          <View style={{flex: 1, flexDirection: 'row'}}>
               <View style={{flex: .5, flexDirection: 'column'}} >
               <Text style={Style.list_item}>
              {this.state.addit.map((addit, i) => (
                  <Text key={i}>{i+1}. {addit}</Text>
              ))}
               </Text>
              </View>
               <View style={{flex: .5}} >
                 <Image source={require('./images/add.jpg')}
               />
               </View>
          </View>
          </Panel>
      </View>
    );
  }


  _handleBarCodeRead = info => {
    this.setState({code : JSON.stringify(info.data)});
 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
