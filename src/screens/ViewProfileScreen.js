import React,{Component} from "react";
import { Text, StyleSheet, Image, View, ScrollView, TouchableOpacity, FlatList, TouchableHighlight, Alert, Modal, TextInput } from "react-native";
import { StackActions,NavigationActions } from "react-navigation";

//import components
import AppHeader from "../components/AppHeader";

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//server path
let config=require('../../Config');

export default class ViewProfileScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      userId:this.props.navigation.getParam('userId')?this.props.navigation.getParam('userId'):null,
      user:null,
      rates:[],

      logoutBoxVisible:false,
    }
    this._query = this._query.bind(this);
  }

  componentDidMount() {
    this._query();
  }

  async _query() {
      await fetch(config.settings.serverPath + '/api/user/' + this.state.userId)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);}
        return response.json();})
      .then(user => {
        this.setState({user});})
      .catch(error => {
        console.error(error);
        this._query()
      });

      await fetch(config.settings.serverPath + '/api/rate')
      .then((response) => {
        if(!response.ok) {
          Alert.alert('Error', response.status.toString());  
          throw Error('Error ' + response.status);
        }
        return response.json()  
      })
      .then((rates) => {  
        this.setState({rates});
      })
      .catch((error) => {
        console.log(error)
        this._query()
      });
  }

  render(){
    var frown=0;
    var meh=0;
    var smile=0;
    for(let i=0;i<this.state.rates.length;i++){
      if(this.state.userId==this.state.rates[i].userId){
        if(this.state.rates[i].rate==0)
          frown+=1;
        else if(this.state.rates[i].rate==1)
          meh+=1;
        else
          smile+=1;
      }
    }
    return(
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
        <View style={styles.body}>
          <MaterialCommunityIcons  style={styles.profilePic}
            name={this.state.user?(this.state.user.gender=="Male"?'face':'face-woman'):''} 
            size={50} 
            color={this.state.user?(this.state.user.gender=="Male"?'#00BECC':'#EA3C53'):''}>
          </MaterialCommunityIcons>
          <Text style={styles.name} editable={false}>{this.state.user?this.state.user.userName:null}</Text>
          <Text style={styles.text}>{this.state.user?this.state.user.email:null}</Text>
          <Text style={styles.text}>{this.state.user?this.state.user.phoneNumber:null}</Text>
          <View style={styles.rateContainer}>
            <View>
              <AntDesign name={'frowno'} size={40} color={'#B80F0A'}></AntDesign>
              <Text style={styles.frownCount}>{frown}</Text>
            </View>
            <View>
              <AntDesign name={'meh'} size={40} color={'#FCE205'}></AntDesign>
              <Text style={styles.mehCount}>{meh}</Text>
            </View>
            <View>
              <AntDesign name={'smileo'} size={40} color={'#4CBB17'}></AntDesign>
              <Text style={styles.smileCount}>{smile}</Text>
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