import React, {Component} from 'react';
import { Text, View, StyleSheet, BackHandler, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//import icons
import Feather from 'react-native-vector-icons/Feather';

export default class AppHeader extends Component<Props>{
  render(){
    return(
      <View style={styles.header}>
        <View style={styles.back}>
          <TouchableOpacity onPress={this.props.thisProps?()=>this.props.thisProps.navigation.goBack():()=>{}}>
            <Feather name={'chevron-left'} size={25} color={"#FAFAFA"}></Feather>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}><Feather name={"book"} size={25} color={"#AC94F4"}></Feather>ookTrades</Text>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  header:{
    flexDirection:'row',
    backgroundColor:"#212121",
    height:50,
    borderBottomWidth:1,
    borderBottomColor:'#424242',
    alignItems:'center'
  },
  back:{
    height:'100%',
    position:'absolute',
    top:'25%',
    left:10,
    zIndex:1,
  },
  name:{
    width:'100%',
    fontFamily:'Quicksand-Bold',
    fontSize:25,
    textAlign:"center",
    color:"#AC94F4",
    marginTop:5,
    marginBottom:5,
    letterSpacing:5
  }
})