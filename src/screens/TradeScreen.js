import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView, FlatList, TouchableHighlight } from "react-native";

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import components
import AppHeader from "../components/AppHeader";

//import login user id
import loginUserId from '../../LoginUserId';

//server path
let config=require('../../Config');

export default class TradeScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      loginUserId:loginUserId.getUserId(),
      trades:[],
      users:[]
    }
    this._query = this._query.bind(this);
  }

  componentDidMount() {
    this._query();
  }

  async _query() {
    await fetch(config.settings.serverPath + '/api/trade')
    .then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());  
        throw Error('Error ' + response.status);
      }
      return response.json()  
    })
    .then((trades) => {  
      this.setState({trades});
    })
    .catch((error) => {
      console.log(error)
    });

    await fetch(config.settings.serverPath + '/api/user')
    .then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());  
        throw Error('Error ' + response.status);
      }
      return response.json()  
    })
    .then((users) => {  
      this.setState({users});
    })
    .catch((error) => {
      console.log(error)
    });
  }

  filter(){
    let filtered=[];
    for(let i=0;i<this.state.trades.length;i++){
      if(this.state.trades[i].user1Id==this.state.loginUserId){
        for(let j=0;j<this.state.users.length;j++){
          if(this.state.trades[i].user2Id==this.state.users[j].userId){
            filtered.push({
              tradeId:this.state.trades[i].tradeId,
              date:this.state.trades[i].date,
              status:this.state.trades[i].status,
              user1Id:this.state.trades[i].user1Id,
              user2Rate:this.state.trades[i].user2Rate,
              userId:this.state.trades[i].user2Id,
              userName:this.state.users[j].userName,
              gender:this.state.users[j].gender,
            })
            break;
          }
        }
      }
      else if(this.state.trades[i].user2Id==this.state.loginUserId){
        for(let j=0;j<this.state.users.length;j++){
          if(this.state.trades[i].user1Id==this.state.users[j].userId){
            filtered.push({
              tradeId:this.state.trades[i].tradeId,
              date:this.state.trades[i].date,
              status:this.state.trades[i].status,
              user1Id:this.state.trades[i].user1Id,
              user2Rate:this.state.trades[i].user2Rate,
              userId:this.state.trades[i].user1Id,
              userName:this.state.users[j].userName,
              gender:this.state.users[j].gender,
            })
            break;
          }
        }
      }
    }
    return filtered;
  }
  
  render(){
    return(
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
        <FlatList
          data={this.filter()}
          keyExtractor={item=>item.tradeId}
          renderItem={({item})=>{
            return(
              <TouchableHighlight style={styles.tradeContainer}
                underlayColor={'#616161'}
                onPress={()=>this.props.navigation.navigate('TradeDetails',{
                  tradeId:item.tradeId,
                  date:item.date,
                  status:item.status,
                  user1Id:item.user1Id,
                  user2Rate:item.user2Rate,
                  userId:item.userId,
                  userName:item.userName,
                  gender:item.gender,
                  refresh:this._query,
                })}  
              >
                <View style={styles.trade}>
                  <View style={styles.profilePic}>
                    <MaterialCommunityIcons 
                      name={item.gender?(item.gender=="Male"?'face':'face-woman'):''} 
                      size={70} 
                      color={item.gender?(item.gender=="Male"?'#00BECC':'#EA3C53'):''}>
                    </MaterialCommunityIcons>
                  </View>
                  <View style={styles.details}>
                    <View style={styles.detail}>
                      <Text style={styles.label}>Name: </Text>
                      <Text style={styles.text}>{item.userName}</Text>
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
