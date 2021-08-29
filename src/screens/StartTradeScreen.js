import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView, FlatList, TouchableHighlight, TouchableOpacity,Alert } from "react-native";

import TradeScreen from "./TradeScreen";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";

//import icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//import components
import AppHeader from "../components/AppHeader";

//import login user id
import loginUserId from '../../LoginUserId';

//server path
let config=require('../../Config');

export default class StartTradeScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      loginUserId:loginUserId.getUserId(),
      bookId:this.props.navigation.getParam('bookId')?this.props.navigation.getParam('bookId'):null,
      userId:this.props.navigation.getParam('userId')?this.props.navigation.getParam('userId'):null,
      books:[],
      tradeDetails:[],

      selected:[],
      selectedNumber:0,
    }
    this._query = this._query.bind(this);
    this._insert = this._insert.bind(this);
  }

  componentDidMount() {
    this._query();
  }

  async _query() {
    let url1 = config.settings.serverPath + '/api/book';
    await fetch(url1)
    .then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());  
        throw Error('Error ' + response.status);
      }
      return response.json()  
    })
    .then((books) => {  
      this.setState({books});
    })
    .catch((error) => {
      console.log(error)
      this._query()
    });

    let url2 = config.settings.serverPath + '/api/tradeDetails';
    await fetch(url2)
    .then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());  
        throw Error('Error ' + response.status);
      }
      return response.json()  
    })
    .then((tradeDetails) => {  
      this.setState({tradeDetails});
    })
    .catch((error) => {
      console.log(error)
      this._query()
    });
  }

  async _insert() {
    await fetch(config.settings.serverPath + '/api/trade', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user1Id: this.state.loginUserId,
        user2Id: this.state.userId,
        date: (new Date().getDate())+"/"+(new Date().getMonth()+1)+"/"+(new Date().getFullYear())
      }),
    }).then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());
        throw Error('Error ' + response.status);
      }
      return response.json()
    }).then((responseJson) => {
      if(responseJson.affected > 0) {
        Alert.alert('Request sent');
      }
      else {
        console.log('respond')
        console.log(responseJson.affected);
        Alert.alert('Error saving record');
      }
    })
    .catch((error) => {
      console.error(error);
    });

    await fetch(config.settings.serverPath + '/api/tradeDetails', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tradeId: this.state.tradeDetails[this.state.tradeDetails.length-1].tradeId+1,
        userId: this.state.userId,
        bookId: this.state.bookId,
      }),
    }).then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());
        throw Error('Error ' + response.status);
      }
      return response.json()
    }).then((responseJson) => {
      if(responseJson.affected > 0) {
        Alert.alert('Request sent');
      }
      else {
        console.log('respond')
        console.log(responseJson.affected);
        Alert.alert('Error saving record');
      }
    })
    .catch((error) => {
      console.error(error);
    });

    for(let i=0;i<this.state.selected.length;i++){
      await fetch(config.settings.serverPath + '/api/tradeDetails', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tradeId: this.state.tradeDetails[this.state.tradeDetails.length-1].tradeId+1,
          userId: this.state.loginUserId,
          bookId: this.state.selected[i],
        }),
      }).then((response) => {
        if(!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json()
      }).then((responseJson) => {
        if(responseJson.affected > 0) {
          Alert.alert('Request sent');
        }
        else {
          console.log('respond')
          console.log(responseJson.affected);
          Alert.alert('Error saving record');
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    //figure out here
    this.props.navigation.getParam('refresh')?this.props.navigation.getParam('refresh'):null;
    this.props.navigation.getParam('refreshHome')?this.props.navigation.getParam('refreshHome'):null;
    //
    this.props.navigation.goBack(),
    this.props.navigation.getParam('thisProps').navigation.goBack()
    
  }

  filter(){
    let filtered=[];
    for(let i=0;i<this.state.books.length;i++){
      if(this.state.books[i].userId==this.state.loginUserId){
        var traded=false;
        for(let j=0;j<this.state.tradeDetails.length;j++){
          if(this.state.books[i].bookId==this.state.tradeDetails[j].bookId){
            traded=true;
            break;
          }
        }
        if(traded==false){
          filtered.push(this.state.books[i]);
        }
      }
    }
    return filtered;
  }

  render(){
    return(
      <View style={styles.container}>
      <AppHeader thisProps={this.props}></AppHeader>
        <Text style={styles.title}>Select book(s) to give!</Text>
        <FlatList
          style={styles.list}
          data={this.filter()}
          keyExtractor={item=>item.id}
          renderItem={({item})=>{
            return(
              <TouchableHighlight style={[styles.bookContainer,{backgroundColor:this.state.selected.includes(item.bookId)?'#424242':'transparent'}]}
                  underlayColor={'#424242'}
                  onPress={()=>{
                    this.state.selected.includes(item.bookId)
                    ?this.state.selected.splice(this.state.selected.indexOf(item.bookId),1)
                    :this.state.selected.push(item.bookId)
                    this.setState({
                      selected:[...this.state.selected],
                      selectedNumber:[...this.state.selected].length
                    })
                    
                  }}  
              >
                  <View style={styles.book}>
                    <View style={styles.bookIcon}><FontAwesome5 name={'book'} size={25} color={'#FAFAFA'}></FontAwesome5></View>
                    <Text style={styles.bookName}>{item.bookName}</Text>
                  </View>
              </TouchableHighlight>
            )
          }}
        ></FlatList>
        <View style={styles.selected}>
          <Text style={styles.selectedLabel}>Selected: </Text>
          <Text style={styles.selectedNumber}>{this.state.selectedNumber}</Text>
          <TouchableOpacity
            style={styles.green}
            onPress={()=>{
              this.state.selectedNumber>0
              ?this._insert()
              :null
            }}
          >
            <Text style={styles.actionText}>Request Trade</Text>
          </TouchableOpacity>
        </View>
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
  title:{
    width:'100%',
    fontFamily:'Raleway-Bold',
    fontSize:18,
    color:'#FAFAFA',
    textAlign:'center',
    padding:10
  },
  list:{
    marginLeft:10,
    marginRight:10,
    borderTopWidth:2,
    borderBottomWidth:2,
    borderColor:'#424242'
  },
  bookContainer:{
    flexDirection:"row",
    marginBottom:0,
    padding:10
  },
  book:{
    width:'100%', 
    flexDirection:'row'
  },
  bookIcon:{
    width:'20%',
    padding:10,
    alignItems:'center',
    justifyContent:'center',
  },
  bookName:{
    width:'80%',
    fontSize:18,
    fontFamily:'Raleway-Regular',
    color:'#FAFAFA',
    padding:10,
    paddingLeft:20
  },
  selected:{
    flexDirection:'row',
    padding:20,
    alignItems:'center'
  },
  selectedLabel:{
    width:'30%',
    fontSize:18,
    fontFamily:'Raleway-Bold',
    color:'#4CBB17',
  },
  selectedNumber:{
    width:'5%',
    fontSize:18,
    fontFamily:'Raleway-Regular',
    color:'#4CBB17',
    marginRight:'5%'
  },
  green:{
    width:'60%',
    backgroundColor:'#4CBB17',
    borderRadius:5,
    alignItems:'center',
    padding:10,
  },
  actionText:{
    fontFamily:'Raleway-Bold',
    fontSize:15,
    color:'#FAFAFA',
  },
});
