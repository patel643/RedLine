'use strict';
import { StyleSheet ,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
const gutter = 3; // You can add gutter if you want

var Style = StyleSheet.create({
  list_container: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 4,
    margin:3,
    padding:10,
    backgroundColor : '#ffe5e5',
    paddingTop : 30,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,.5)'
  },
  list_item: {
    fontSize: 15,
  },
  list_header: {
    fontSize: 22,
    margin:10,
    flex    : 1,
    fontWeight :'bold',
    color:'#e60000',
  },
  list_sub_header: {
    fontSize: 17,
    fontWeight :'bold',
  },

});

export default Style;
