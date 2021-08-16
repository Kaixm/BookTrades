import React,{Component} from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { StackActions,NavigationActions } from "react-navigation";

//import icons
import Feather from 'react-native-vector-icons/Feather';

//prevent HOME back to LOGIN once back button pressed
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});


export default class LoginScreen extends Component<Props>{
  state = {
    email: '',
    password: ''
 }
 handleEmail = (text) => {
    this.setState({ email: text })
 }
 handlePassword = (text) => {
    this.setState({ password: text })
 }
 login = (email, pass) => {
    alert('email: ' + email + ' password: ' + pass)
 }


  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.name}><Feather name={"book"} size={30} color={"#AC94F4"}></Feather>ookTrades</Text>  
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Email"
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {this.handleEmail}
        />
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Password"
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {this.handlePassword}
        />

        <TouchableOpacity 
         style={styles.login}
        onPress={()=>{this.props.navigation.dispatch(resetAction);}}
        >
        <Text style={styles.loginText}>Login</Text></TouchableOpacity>
        
        <TouchableOpacity 
        style={styles.register}
        onPress={()=>this.props.navigation.navigate('Register')}
        >
        <Text style={styles.registerText}>Register</Text></TouchableOpacity>
        
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#212121',
  },
  name:{
    fontSize: 30 ,
    fontFamily:'Quicksand-Bold',
    color:"#AC94F4",
    marginBottom: 30,
    letterSpacing:5
  },
  login:{
    width:'60%',
    backgroundColor:"#AC94F4",
    borderRadius:5,
    borderWidth:2,
    borderColor:'#AC94F4',
    alignItems:'center',
    padding:5,
    marginTop:50
  },
  loginText:{
    fontFamily:'Raleway-Bold',
    fontSize:18,
    color:'#FAFAFA',
    alignItems: 'center',
  },
  register:{
    width:'60%',
    borderRadius:5,
    borderWidth:2,
    borderColor:'#AC94F4',
    alignItems:'center',
    padding:5,
    marginTop:10
  },
  registerText:{
    fontFamily:'Raleway-Bold',
    fontSize:18,
    color:'#AC94F4',
    alignItems: 'center',
  },
  input:{
    marginTop:5,
    marginBottom:5,
    color:"#FFFAF0",
    fontSize: 18,
    shadowColor: "#FFFAF0",
    borderBottomWidth:2,
    borderColor:"#AC94F4",
    borderRadius:5,
    padding:10,
    width:'60%'
  },
});
