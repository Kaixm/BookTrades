import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import components
import AppHeader from "../components/AppHeader";
import TradeBookContainer from "../components/TradeBookContainer";

export default class TradeDetailsScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      gender:this.props.navigation.getParam('gender')?this.props.navigation.getParam('gender'):"",
      name:this.props.navigation.getParam('name')?this.props.navigation.getParam('name'):"",
      date:this.props.navigation.getParam('date')?this.props.navigation.getParam('date'):"",
      status:this.props.navigation.getParam('status')?this.props.navigation.getParam('status'):"",
      statusColor:this.props.navigation.getParam('status')?(this.props.navigation.getParam('status')=="Completed"?'#4CBB17':'#B80F0A'):'#FAFAFA',
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
        <ScrollView>
          <MaterialCommunityIcons  style={styles.profilePic}
            name={this.state.gender!=""?(this.state.gender=="Male"?'face':'face-woman'):''} 
            size={100} 
            color={this.state.gender!=""?(this.state.gender=="Male"?'#00BECC':'#EA3C53'):''}>
          </MaterialCommunityIcons>
          <Text style={styles.text}>{this.state.name}</Text>
          <Text style={styles.text}>{this.state.date}</Text>
          <Text style={[styles.text,{color:this.state.statusColor,fontFamily:'Raleway-Bold'}]}>{this.state.status}</Text>
          <View style={styles.giveReceiveContainer}>
            <Text style={styles.subheader}>You Give</Text>
            <TradeBookContainer
              //test data
              name={"Book 1"}
            ></TradeBookContainer>
            <TradeBookContainer
              //test data
              name={"Book 2"}
            ></TradeBookContainer>
          </View>
          <View style={styles.giveReceiveContainer}>
            <Text style={styles.subheader}>You Receive</Text>
            <TradeBookContainer
              //test data
              name={"Book 4"}
            ></TradeBookContainer>
            <TradeBookContainer
              //test data
              name={"Book 5"}
            ></TradeBookContainer>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancel}>
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.complete}>
              <Text style={styles.actionText}>Complete & Review</Text>
            </TouchableOpacity>
          </View>
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
  profilePic:{
    width:'100%',
    textAlign:'center',
    paddingTop:5,
    paddingBottom:5
  },
  text:{
    width:'100%',
    fontSize:18,
    fontFamily:'Raleway-Regular',
    color:'#FAFAFA',
    textAlign:'center',
    paddingTop:2,
    paddingBottom:2
  },
  giveReceiveContainer:{
    margin:10,
    marginTop:20
  },
  subheader:{
    fontFamily:'Raleway-Bold',
    fontSize:20,
    backgroundColor:'#424242',
    color:'#FAFAFA',
    textAlign:'center',
    borderBottomWidth:1,
    borderBottomColor:'#212121',
    padding:5
  },
  actions:{
    flexDirection:'row',
    padding:10
  },
  cancel:{
    width:'40%',
    backgroundColor:'#B80F0A',
    borderRadius:5,
    alignItems:'center',
    padding:10,
    marginRight:'2.5%'
  },
  complete:{
    width:'55%',
    backgroundColor:'#4CBB17',
    borderRadius:5,
    alignItems:'center',
    padding:10,
    marginLeft:'2.5%'
  },
  actionText:{
    fontFamily:'Raleway-Bold',
    fontSize:15,
    color:'#FAFAFA',
  }
});