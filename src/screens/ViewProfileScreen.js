import React,{Component} from "react";
import { Text, StyleSheet, Image, View, ScrollView, TouchableOpacity, FlatList, TouchableHighlight, Alert, Modal, TextInput } from "react-native";
import { StackActions,NavigationActions } from "react-navigation";

//import components
import AppHeader from "../components/AppHeader";

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class ViewProfileScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      userId:this.props.navigation.getParam('userId')?this.props.navigation.getParam('userId'):"",

      logoutBoxVisible:false,
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
        <View style={styles.body}>
          <MaterialCommunityIcons  style={styles.profilePic}
            name={this.state.gender!=""?(this.state.gender=="Male"?'face':'face-woman'):''} 
            size={50} 
            color={this.state.gender!=""?(this.state.gender=="Male"?'#00BECC':'#EA3C53'):''}>
          </MaterialCommunityIcons>
          <Text style={styles.name} editable={false}>{}</Text>
          <Text style={styles.text}>{}</Text>
          <Text style={styles.text}>{}</Text>
          <View style={styles.rateContainer}>
            <View>
              <AntDesign name={'frowno'} size={40} color={'#B80F0A'}></AntDesign>
              <Text style={styles.frownCount}>{}</Text>
            </View>
            <View>
              <AntDesign name={'meh'} size={40} color={'#FCE205'}></AntDesign>
              <Text style={styles.mehCount}>{}</Text>
            </View>
            <View>
              <AntDesign name={'smileo'} size={40} color={'#4CBB17'}></AntDesign>
              <Text style={styles.smileCount}>{}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#212121',
  },
  body:{
    flex:0.9,
    justifyContent:'center',
  },
  profilePic:{
    width:'100%',
    textAlign:'center',
    paddingTop:5,
    paddingBottom:5
  },
  text:{
    width:'100%',
    fontSize:18,
    fontFamily:'Raleway-Regular',
    color:'#FAFAFA',
    textAlign:'center',
    paddingTop:2,
    paddingBottom:2
  },
  name:{
    width:'100%',
    fontSize:18,
    fontFamily:'Raleway-Bold',
    color:'#FAFAFA',
    textAlign:'center',
  },
  rateContainer:{
    margin:20,
    marginTop:50,
    borderRadius:5,
    borderWidth:2,
    borderColor:'#424242',
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
    padding:20
  },
  frownCount:{
    color:'#B80F0A',
    fontFamily:'Raleway-Bold',
    fontSize:20,
    textAlign:'center'
  },
  mehCount:{
    color:'#FCE205',
    fontFamily:'Raleway-Bold',
    fontSize:20,
    textAlign:'center'
  },
  smileCount:{
    color:'#4CBB17',
    fontFamily:'Raleway-Bold',
    fontSize:20,
    textAlign:'center'
  }
});