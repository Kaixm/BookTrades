import React,{Component} from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default class RegisterScreen extends Component<Props>{
  render(){
    return(
      //template only, please remove when proceed to your code
      <View style={styles.center}>
        <Text>RegisterScreen</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}><Text>Register & Login</Text></TouchableOpacity>
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
