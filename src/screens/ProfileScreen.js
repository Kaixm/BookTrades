import React,{Component} from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { StackActions,NavigationActions } from "react-navigation";

//import components
import AppHeader from "../components/AppHeader";

//prevent LOGIN back to PROFILE once back button pressed
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

export default class ProfileScreen extends Component<Props>{
  render(){
    return(
      <View style={styles.container}>
        <AppHeader></AppHeader>
        <ScrollView>


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
  //start your style below...
});
