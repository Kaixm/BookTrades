import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { StackActions,NavigationActions } from "react-navigation";

//import components
import AppHeader from "../components/AppHeader";

export default class HomeScreen extends Component<Props>{
  
  render(){
    return(
      <View style={styles.container}>
        <AppHeader></AppHeader>
        <ScrollView>
        <Text>HomeScreen</Text>

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
