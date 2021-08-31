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
      userName:'',
      email:'',
      phoneNumber:'',
      gender:'Male',
      password:''
    }
    this._insert = this._insert.bind(this);
  }

  componentDidMount(){
    this._readRegisterInfo();
  }

  async _insert() {
    fetch(config.settings.serverPath + '/api/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.state.userName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        password: this.state.password,
      }),
    }).then((response) => {
      if(!response.ok) {
        throw Error('Error ' + response.status);
      }
      return response.json()
    }).then((responseJson) => {
      if(responseJson.affected > 0) {
        this.props.navigation.getParam('refresh')();
        this.props.navigation.goBack();
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  async _readRegisterInfo(){
    newStates={}
    try{
      let keys=await AsyncStorage.multiGet(
        ['userName','email','phoneNumber','gender','password'],
        (err,stores)=>{
          stores.map((result,i,store)=>{
            let key=store[i][0];
            let value=store[i][1];
            {newStates[key]=value};
          })
          this.setState(newStates);
        }
      )
    }
    catch(error){
      console.log(error);
    }
  }

  async _saveRegisterInfo(key,value){
    try{
      await AsyncStorage.setItem(key,value);
    }
    catch(error){
      console.log(error);
    }
  }

  async _removeResisterInfo(){
    let keys=['userName','email','phoneNumber','gender','password'];
    AsyncStorage.multiRemove(keys,err=>{});
  }

  render(){
    //disable the warning
    console.disableYellowBox = true;
    return(
      <View style={styles.container}>
      <AppHeader thisProps={this.props}></AppHeader>
      <View style={styles.form}>
        <Text style={styles.title}>Fill in your information below:</Text>
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Name"
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          value={this.state.userName}
          onChangeText = {(userName)=>{
            this.setState({userName})
            this._saveRegisterInfo('userName',userName)
          }}
        />
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Email"
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          value={this.state.email}
          onChangeText = {(email)=>{
            this.setState({email})
            this._saveRegisterInfo('email',email)
          }}
        />
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Phone Number"
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          value={this.state.phoneNumber}
          onChangeText = {(phoneNumber)=>{
            this.setState({phoneNumber})
            this._saveRegisterInfo('phoneNumber',phoneNumber)
          }}
        />
        <View style={{borderBottomWidth:2,borderBottomColor:"#AC94F4",margin:2,width:'80%'}}>
        <Picker
          selectedValue={this.state.gender}
          style={{color:"#FAFAFA",fontFamily:'Raleway-Regular',fontSize:18}}
          onValueChange = {(itemValue,itemIndex)=>{
            this.setState({gender:itemValue})
            this._saveRegisterInfo('gender',itemValue)
          }}
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
          value={this.state.password}
          onChangeText = {(password)=>{
            this.setState({password})
            this._saveRegisterInfo('password',password)
          }}
        />
        <TouchableOpacity 
        style={styles.register}
        onPress={()=>{
          this._insert()
          this._removeResisterInfo()
        }}
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
