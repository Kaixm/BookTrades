import React,{Component} from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Picker } from "react-native";

//import components
import AppHeader from "../components/AppHeader";

export default class RegisterScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      phoneNumber:'',
      gender:'Male',
      password:''
    }
  }

  render(){
    return(
      //template only, please remove when proceed to your code
      <View style={styles.container}>
      <AppHeader thisProps={this.props}></AppHeader>
      <View style={styles.form}>
        <Text style={styles.title}>Fill in your information below:</Text>
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Name"
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {(name)=>this.setState({name:name})}
        />
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Email"
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {(email)=>this.setState({email:email})}
        />
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Phone Number"
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {(phoneNumber)=>this.setState({phoneNumber:phoneNumber})}
        />
        <View style={{borderBottomWidth:2,borderBottomColor:"#AC94F4",margin:2,width:'80%'}}>
        <Picker
          selectedValue={this.state.gender}
          style={{color:"#FAFAFA",fontFamily:'Raleway-Regular',fontSize:18}}
          onValueChange = {(gender)=>this.setState({gender:gender})}
        >
          <Picker.Item label={'Male'} value={'Male'} />
          <Picker.Item label={'Female'} value={'Female'} />
        </Picker>
        </View>
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Password"
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {this.handlePassword}
        />
        <TouchableOpacity 
        style={styles.register}
        onPress={()=>this.props.navigation.navigate('Login')}
        >
        <Text style={styles.registerText}>Register</Text></TouchableOpacity>
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
  title:{
    fontSize: 18 ,
    fontFamily:'Quicksand-Bold',
    color:"#FAFAFA",
    padding:10,
    textAlign:'center'
  },
  form:{
    flex:0.9,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
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
    width:'80%',
  },
  register:{
    width:'70%',
    backgroundColor:"#AC94F4",
    borderRadius:5,
    borderWidth:2,
    borderColor:'#AC94F4',
    alignItems:'center',
    padding:5,
    marginTop:50
  },
  registerText:{
    fontFamily:'Raleway-Bold',
    fontSize:18,
    color:'#FAFAFA',
    alignItems: 'center',
  },
});
