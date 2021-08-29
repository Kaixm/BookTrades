import React,{Component} from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Picker, AsyncStorage } from "react-native";

//import components
import AppHeader from "../components/AppHeader";

//server path
let config=require('../../Config');

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

  _insert() {
    let url = config.settings.serverPath + '/api/user';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        password: this.state.password,
      }),
    }).then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());
        throw Error('Error ' + response.status);
      }
      return response.json()
    }).then((responseJson) => {
      if(responseJson.affected > 0) {
        Alert.alert('Record Saved', 'Record for `' + this.state.name + '` has been saved');
      }
      else {
        console.log('respond')
        console.log(responseJson.affected);
        Alert.alert('Error saving record');
      }
      this.props.navigation.getParam('refresh')();
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error(error);
    });
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
        onPress={()=>{this._register()}}
        >
        <Text style={styles.registerText}>Register</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
};

_register(){
  this.-createAccount();
  this.-insert();
}

_createAccount = async () => {
  const arrayData = [];

  if (
    this.state.name &&
    this.state.email &&
    this.state.phoneNumber &&
    this.state.gender &&
    this.state.password !== null
  ) {
    const data = {
      name: this.state.name,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      password: this.state.password
    };
    arrayData.push(data);
    try {
      AsyncStorage.getItem("database_form").then(value => {
        if (value !== null) {
          const d = JSON.parse(value);
          d.push(data);
          AsyncStorage.setItem("database_form", JSON.stringify(d)).then(
            () => {
              this.props.navigation.navigate("Auth");
            }
          );
        } else {
          AsyncStorage.setItem(
            "database_form",
            JSON.stringify(arrayData)
          ).then(() => {
            this.props.navigation.navigate("Auth");
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("All informatino field");
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
