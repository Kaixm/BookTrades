import React,{Component} from "react";
import { Text, StyleSheet, View } from "react-native";

//import components
import AppHeader from "../components/AppHeader";

export default class BookDetailsScreen extends Component<Props>{
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
});
