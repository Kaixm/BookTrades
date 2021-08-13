import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView, FlatList } from "react-native";

//import components
import AppHeader from "../components/AppHeader";
import TradeContainer from "../components/TradeContainer";

//test data
const tradeData=[
  {
    id:"1",
    name:"Lee Siang Wei",
    date:"06/08/2021",
    status:"Requesting",
    gender:"Male",
  },
  {
    id:"2",
    name:"Lee Siang Wei",
    date:"06/08/2021",
    status:"Exchanging",
    gender:"Male",
  },
  {
    id:"3",
    name:"Lee Siang Wei",
    date:"06/08/2021",
    status:"Done",
    gender:"Male",
  },
];

export default class TradeScreen extends Component<Props>{
  render(){
    return(
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
        <FlatList
          data={tradeData}
          keyExtractor={item=>item.id}
          renderItem={({item})=>{
            return(
              <TradeContainer
                //test data
                id={item.id}
                name={item.name}
                date={item.date}
                status={item.status}
                gender={item.gender}
                thisProps={this.props}
              ></TradeContainer>
              )
            }}
        ></FlatList>
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
