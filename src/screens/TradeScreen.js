import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";

//import components
import AppHeader from "../components/AppHeader";
import TradeContainer from "../components/TradeContainer";

export default class TradeScreen extends Component<Props>{
  render(){
    return(
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
        <ScrollView>
          <TradeContainer
            //test data 
            name={"Lee Siang Wei"} 
            date={"06/08/2021"} 
            status={"Completed"}
            gender={"Male"}
            thisProps={this.props}>
          </TradeContainer>
          <TradeContainer
            //test data 
            name={"Pon Yu Hang"} 
            date={"02/08/2021"} 
            status={"Pending"}
            gender={"Female"}
            thisProps={this.props}>
          </TradeContainer>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#212121',
  },
});
