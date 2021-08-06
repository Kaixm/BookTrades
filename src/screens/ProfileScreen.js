import React,{Component} from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackActions,NavigationActions } from "react-navigation";

//prevent LOGIN back to PROFILE once back button pressed
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

export default class ProfileScreen extends Component<Props>{
  render(){
    return(
      //template only, please remove when proceed to your code
      <View style={styles.center}>
        <Text>ProfileScreen</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('About')}><Text>Go to AboutScreen</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Guide')}><Text>Go to GuideScreen</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(resetAction)}}><Text>Logout</Text></TouchableOpacity>
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
