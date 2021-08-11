import React,{Component} from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackActions,NavigationActions } from "react-navigation";

//prevent HOME back to LOGIN once back button pressed
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

export default class LoginScreen extends Component<Props>{
 
  render(){
    return(
      //template only, please remove when proceed to your code
      <View style={styles.center}>
        <Text>LoginScreen</Text>
        <Text>Welcome back.</Text>
        <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(resetAction);}}><Text>Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}><Text>Register</Text></TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  //template only, please remove when proceed to your code
  center:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
});
