import React,{Component} from "react";
import { Text, StyleSheet, View } from "react-native";
import { StackActions,NavigationActions } from "react-navigation";

export default class HomeScreen extends Component<Props>{
  
  render(){
    return(
      //template only, please remove when proceed to your code
      <View style={styles.center}>
        <Text>HomeScreen</Text>
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
