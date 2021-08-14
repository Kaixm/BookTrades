import React,{Component} from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from "react-native";

//import components
import AppHeader from "../components/AppHeader";

export default class RegisterScreen extends Component<Props>{
  render(){
    return(
      //template only, please remove when proceed to your code
      <View style={styles.container}>
      <AppHeader thisProps={this.props}></AppHeader>
      <ScrollView>
        <Text style={styles.text}>Registration</Text>
        <View style={styles.actions}>
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Enter your name..."
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {this.handleEmail}
        />
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Enter your email..."
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {this.handleEmail}
        />
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Enter your gender..."
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {this.handleEmail}
        />
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Enter your phone number..."
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {this.handleEmail}
        />
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Enter your password..."
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {this.handleEmail}
        />
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Re-enter your password..."
          placeholderTextColor = "#616161"
          autoCapitalize = "none"
          onChangeText = {this.handleEmail}
        />
        </View>
        <TouchableOpacity 
        style={styles.green}
        onPress={()=>this.props.navigation.navigate('Login')}
        >
        <Text style={styles.actionText}>Login</Text></TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#212121',
  },
  text:{
    fontSize: 40 ,
    fontFamily:'Quicksand-Bold',
    color:"#AC94F4",
    marginTop: 10,
    marginBottom: 10,
    padding:10,
  },
  actions:{
    flexDirection: "column",
    justifyContent: 'space-between',
    padding:10,
  },
  input:{
    backgroundColor: "#FAFAFA",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color:"#FAFAFA",
    width: '90%',
    height: 60,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
    borderRadius:5,
  },
  green:{
    backgroundColor:'#4CBB17',
    borderRadius:5,
    alignItems:'center',
    padding:15,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 10,
    width: '40%',
  },
  actionText:{
    color: "#FAFAFA",
  }
});
