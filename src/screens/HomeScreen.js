import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, TextInput, Picker, TouchableOpacity, FlatList, TouchableHighlight} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

//import icons
import Feather from 'react-native-vector-icons/Feather';

//import components
import AppHeader from '../components/AppHeader';
import BookContainer from '../components/BookContainer';

//import login user id
import loginUserId from '../../LoginUserId';

//server path
let config=require('../../Config');

export default class HomeScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      loginUserId:loginUserId.getUserId(),
      books:[],
      tradeDetails:[],
      display:[]
    }
    this._query = this._query.bind(this);
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
    });
  }

  filter(){
    let filtered=[];
    for(let i=0;i<this.state.books.length;i++){
      if(this.state.books[i].userId!=this.state.loginUserId){
        var traded=false;
        for(let j=0;j<this.state.tradeDetails.length;j++){
          if(this.state.books[i].bookId==this.state.tradeDetails[j].bookId){
            traded=true;
            break;
          }
        }
        if(!traded){
          filtered.push(this.state.books[i]);
        }
      }
    }
    return filtered;
  }

  render() {
    //disable the warning
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <AppHeader></AppHeader>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            placeholder="Search by book name"
            placeholderTextColor="#828282"
          />
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={()=>{
              //search
            }}
          >
            <Feather name={'search'} size={30} color={'#FAFAFA'}></Feather>
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.pickerContainer}>
              <Picker
                style={styles.filter}
                dropdownIconColor="#FAFAFA"
              >
                <Picker.Item label="All Genre" value="All" />
                <Picker.Item label="Fiction" value="Fiction" />
                <Picker.Item label="Non-Fiction" value="Non-Fiction" />
              </Picker>
            </View>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.filter}
              dropdownIconColor="#FAFAFA"
            >
              <Picker.Item label="All Languages" value="All" />
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Chinese" value="Chinese" />
              <Picker.Item label="Malay" value="Malay" />
            </Picker>
          </View>
        </View>
        <FlatList
            style={styles.list}
            data={this.filter()}
            extraData={this.filter()}
            keyExtractor={item=>item.bookId}
            renderItem={({item})=>{
              return(
                <BookContainer
                  bookId={item.bookId}
                  userId={item.userId}
                  bookName={item.bookName}
                  fromScreen={'Home'}
                  thisProps={this.props}
                  refresh={this._query}
                ></BookContainer>
              )
            }}
          ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#212121',
  },
  search:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    padding:10
  },
  input: {
    width:'90%',
    padding:5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    color: '#FAFAFA',
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
    backgroundColor: '#424242',
  },
  searchIcon:{
    width:'10%',
    alignItems:'flex-end'
  },
  filterContainer: {
    flexDirection: 'row',
    margin:10,
    marginTop:0,
    marginBottom:0,
    justifyContent:'space-between'
  },
  pickerContainer: {
    width: '45%',
    borderBottomColor: '#AC94F4',
    borderBottomWidth: 2,
  },
  filter: {
    color: '#FAFAFA',
  },
  list:{
    margin:10,
    marginTop:20,
    marginBottom:20,
    borderTopWidth:2,
    borderColor:'#424242'
  },
  subheader:{
    flexDirection:'row',
    backgroundColor:'#424242',
    borderBottomWidth:1,
    borderBottomColor:'#212121',
    padding:5,
    paddingLeft:30,
    paddingRight:30,
    justifyContent:'space-between',
    alignItems:'center',
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
});
