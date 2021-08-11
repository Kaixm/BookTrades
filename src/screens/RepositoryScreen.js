import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";

//import components
import AppHeader from "../components/AppHeader";

export default class RepositoryScreen extends Component<Props>{
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
