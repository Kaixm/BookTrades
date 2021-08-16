import React,{Component} from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { StackActions,NavigationActions } from "react-navigation";

//import icons
import Feather from 'react-native-vector-icons/Feather';
import { color } from "react-native-reanimated";

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
        <Text style={styles.name}><Feather name={"book"} size={50} color={"#AC94F4"}></Feather>ookTrades</Text>  
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Enter email..."
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {this.handleEmail}
        />
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Enter password..."
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {this.handlePassword}
        />

        <View style={styles.actions}>
        <TouchableOpacity 
         style={styles.green}
        onPress={()=>{this.props.navigation.dispatch(resetAction);}}
        >
        <Text style={styles.actionText}>Login</Text></TouchableOpacity>
        
        <TouchableOpacity 
        style={styles.purple}
        onPress={()=>this.props.navigation.navigate('Register')}
        >
        <Text style={styles.actionText}>Register</Text></TouchableOpacity>
        
        </View>
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
    fontSize: 40 ,
    fontFamily:'Quicksand-Bold',
    color:"#AC94F4",
    marginTop: 5,
    marginBottom: 60,
  },
  actions:{
    flexDirection: "row" ,
    padding:20,
    marginTop: 50,
    justifyContent: 'space-between',
    width: '100%', 
  },
  green:{
    width:'40%',
    backgroundColor:'#4CBB17',
    borderRadius:5,
    alignItems:'center',
    padding:10,
    marginLeft:'5%',
  },
  purple:{
    width:'40%',
    backgroundColor:"#AC94F4",
    borderRadius:5,
    alignItems:'center',
    padding:10,
    marginRight:'5%',
  },
  actionText:{
    fontFamily:'Raleway-Bold',
    fontSize:18,
    color:'#FAFAFA',
    marginTop:5,
    marginBottom:5,
    alignItems: 'center',
  },
  input:{
    marginTop:15,
    marginBottom:15,
    color:"#FFFAF0",
    fontSize: 20,
    shadowColor: "#FFFAF0",
  },
});
