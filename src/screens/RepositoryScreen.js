import React,{Component} from "react";
import { Text, StyleSheet, View } from "react-native";

export default class RepositoryScreen extends Component<Props>{
  render(){
    return(
      //template only, please remove when proceed to your code
      <View style={styles.center}>
        <Text>RepositoryScreen</Text>
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
