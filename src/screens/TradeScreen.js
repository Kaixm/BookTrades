import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView, FlatList, TouchableHighlight } from "react-native";

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import components
import AppHeader from "../components/AppHeader";

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
    gender:"Female",
  },
];

export default class TradeScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    return(
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
        <FlatList
          data={tradeData}
          keyExtractor={item=>item.id}
          renderItem={({item})=>{
            return(
              <TouchableHighlight style={styles.tradeContainer}
                underlayColor={'#616161'}
                onPress={()=>this.props.navigation.navigate('TradeDetails',{
                  tradeId:item.id,
                })}  
              >
                <View style={styles.trade}>
                  <View style={styles.profilePic}>
                    <MaterialCommunityIcons 
                      name={item.gender!=""?(item.gender=="Male"?'face':'face-woman'):''} 
                      size={70} 
                      color={item.gender!=""?(item.gender=="Male"?'#00BECC':'#EA3C53'):''}>
                    </MaterialCommunityIcons>
                  </View>
                  <View style={styles.details}>
                    <View style={styles.detail}>
                      <Text style={styles.label}>Name: </Text>
                      <Text style={styles.text}>{item.name}</Text>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.label}>Date: </Text>
                      <Text style={styles.text}>{item.date}</Text>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.label}>Status: </Text>
                      <Text style={[styles.text,{fontFamily:'Raleway-Bold', color:item.status=='Requesting'?'#B80F0A':(item.status=='Exchanging'?'#FCE205':'#4CBB17')}]}>{item.status}</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
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
  tradeContainer:{
    flexDirection:"row",
    margin:10,
    marginBottom:0,
    backgroundColor:'#424242',
    borderRadius:5,
  },
  trade:{
    width:'100%', 
    flexDirection:'row'
  },
  profilePic:{
    width:'20%',
    flexDirection:'row',
    padding:5,
    alignItems:'center',
    justifyContent:'center',
  },
  details:{
    width:'80%',
    flexDirection:'column',
    padding:5,
    alignItems:"center",
  },
  detail:{
    flexDirection:'row',
  },
  label:{
    width:'30%',
    fontSize:18,
    fontFamily:'Raleway-Bold',
    color:'#FAFAFA',
    paddingLeft:10
  },
  text:{
    width:'70%',
    fontSize:18,
    fontFamily:'Raleway-Regular',
    color:'#FAFAFA',
  }
});
