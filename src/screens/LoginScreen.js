import React,{Component} from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Modal, AsyncStorage } from "react-native";

//import icons
import Feather from 'react-native-vector-icons/Feather';

//import login user id
import loginUserId from '../../LoginUserId';

//server path
let config=require('../../Config');

export default class LoginScreen extends Component<Props>{
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      email:'',
      password:'',

      loginFailBoxVisible:false,
    };
    this._query = this._query.bind(this);
  }

  componentDidMount() {
    this._query();
    this._readRegisterInfo();
  }

  async _query() {
    await fetch(config.settings.serverPath + '/api/user',{method:'GET'})
    .then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());  
        throw Error('Error ' + response.status);
      }
      return response.json()  
    })
    .then((users) => {  
      this.setState({users});
    })
    .catch((error) => {
      console.log(error)
      this._query()
    });
  }

  async _readRegisterInfo(){
    newStates={}
    try{
      let keys=await AsyncStorage.multiGet(
        ['email','password'],
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
    let keys=['email','password'];
    AsyncStorage.multiRemove(keys,err=>{});
  }

  render(){
    //disable the warning
    console.disableYellowBox = true;
    return(
      <View style={styles.container}>
        <Text style={styles.name}><Feather name={"book"} size={30} color={"#AC94F4"}></Feather>ookTrades</Text>  
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
          value={this.state.email}
        />
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
          value={this.state.password}
        />

        <TouchableOpacity
          style={styles.login}
          onPress={()=>{
            for(let i=0;i<this.state.users.length;i++){
              if(this.state.email==this.state.users[i].email&&this.state.password==this.state.users[i].password){
                this.props.navigation.navigate('Home',{},loginUserId.setUserId(this.state.users[i].userId));
                break;
              }
            }
            this.setState({loginFailBoxVisible:true})
          }}
        >
        <Text style={styles.loginText}>Login</Text></TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.register}
          onPress={()=>this.props.navigation.navigate('Register',{
            refresh:this._query
          })}
        >
        <Text style={styles.registerText}>Register</Text></TouchableOpacity>
        
        {/*pop out box for login fail*/}
        <Modal visible={this.state.loginFailBoxVisible}>
          <View>
            <View style={styles.popoutBoxBackground}></View>
            <View style={styles.popoutBox}>
              <Text style={styles.popoutBoxTitle}>Login Fail</Text>
              <View style={styles.popoutActions}>
                <TouchableOpacity
                  style={styles.popoutActionOutline}
                  onPress={()=>{
                    this.setState({
                      email:'',
                      password:'',
                      loginFailBoxVisible:false,
                    })
                  }}
                >
                  <Text style={styles.popoutSubmitText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  popoutBoxBackground:{
    height:'100%',
    backgroundColor:'#424242',
  },
  popoutBox:{
    flexDirection:'column',
    width:'80%',
    backgroundColor:'#212121',
    borderRadius:10,
    position:'absolute',
    marginLeft:'10%',
    marginRight:'10%',
    marginTop:'50%',
    marginBottom:'50%'
  },
  popoutBoxTitle:{
    width:'100%',
    fontFamily:'Raleway-Bold',
    fontSize:15,
    color:'#FAFAFA',
    textAlign:'center',
    padding:50,
    paddingBottom:20,
  },
  rateIcons:{
    width:'100%',
    flexDirection:'row',
    padding:50,
    paddingBottom:20,
    justifyContent:'space-between'
  },
  popoutActions:{
    width:'100%',
    flexDirection:'row',
    padding:20,
    justifyContent:'space-between'
  },
  popoutActionOutline:{
    width:'100%',
    borderRadius:5,
    alignItems:'center',
    padding:10,
  },
  popoutBackText:{
    fontFamily:'Raleway-Bold',
    fontSize:15,
    color:'#B80F0A',
  },
  popoutSubmitText:{
    fontFamily:'Raleway-Bold',
    fontSize:15,
    color:'#4CBB17',
  }
});
