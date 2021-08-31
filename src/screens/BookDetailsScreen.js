import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Modal, TouchableHighlight, Alert } from "react-native";

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import components
import AppHeader from "../components/AppHeader";

//import login user id
import loginUserId from '../../LoginUserId';

//server path
let config=require('../../Config');

export default class BookDetailsScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      bookId:this.props.navigation.getParam('bookId')?this.props.navigation.getParam('bookId'):null,
      userId:this.props.navigation.getParam('userId')?this.props.navigation.getParam('userId'):null,
      book:null,
      user:null,

      deleteBoxVisible:false,
      fromScreen:this.props.navigation.getParam('fromScreen')?this.props.navigation.getParam('fromScreen'):null,
    }
    this._query = this._query.bind(this);
    this._delete=this._delete.bind(this);
  }

  componentDidMount() {
    this._query();
  }

  async _query() {
    await fetch(config.settings.serverPath + '/api/book/' + this.state.bookId)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);}
        return response.json();})
      .then(book => {
        this.setState({book});})
      .catch(error => {
        console.error(error);
        this._query()
      });

    await fetch(config.settings.serverPath + '/api/user/' + this.state.userId)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);}
        return response.json();})
      .then(user => {
        this.setState({user});})
      .catch(error => {
        console.error(error);
        this._query()
      });
  }

  async _delete() {
    let url = config.settings.serverPath + '/api/book/' + this.state.bookId;
    await fetch(url, { 
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId: this.state.bookId,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw Error('Error ' + response.status);
      }
      return response.json();
    })
    .then(responseJson => {
      if (responseJson.affected > 0) {
        this.props.navigation.getParam('refresh')();
        this.props.navigation.goBack();
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
        <ScrollView>
        <TouchableHighlight
            style={styles.profile}
            underlayColor={'#424242'}
            onPress={()=>{this.state.fromScreen=='Profile'?null:
              this.props.navigation.navigate('ViewProfile',{
                userId:this.state.userId,
              })
            }}
          >
            <View>
              <MaterialCommunityIcons  style={styles.profilePic}
                name={this.state.user?(this.state.user.gender=="Male"?'face':'face-woman'):''} 
                size={50} 
                color={this.state.user?(this.state.user.gender=="Male"?'#00BECC':'#EA3C53'):''}>
              </MaterialCommunityIcons>
              <Text style={styles.name} editable={false}>{this.state.user?this.state.user.userName:null}</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.details}>
            <View style={styles.detail}>
              <Text style={styles.label}>Book Name: </Text>
              <TextInput style={styles.text} editable={false}>{this.state.book?this.state.book.bookName:null}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Genre: </Text>
              <TextInput style={styles.text} editable={false}>{this.state.book?this.state.book.genre:null}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Language: </Text>
              <TextInput style={styles.text} editable={false}>{this.state.book?this.state.book.language:null}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Year: </Text>
              <TextInput style={styles.text} editable={false}>{this.state.book?this.state.book.year:null}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Condition: </Text>
              <TextInput style={styles.text} editable={false}>{this.state.book?this.state.book.condition:null}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Description: </Text>
              <TextInput style={styles.description} editable={false} multiline={true}>{this.state.book?this.state.book.description:null}</TextInput>
            </View>
          </View>
          {this.state.fromScreen=='Home'
          ?(
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.trade}
                onPress={()=>{
                  this.props.navigation.navigate('StartTrade',{
                    bookId:this.state.bookId,
                    userId:this.state.userId,
                    thisProps:this.props,
                    refresh:this._query,
                    refreshHome:this.props.navigation.getParam('refresh')?this.props.navigation.getParam('refresh'):null
                  })
                }}
              >
                <Text style={styles.actionText}>Trade</Text>
              </TouchableOpacity>      
            </View>
          )
          :null}
          {this.state.fromScreen=='Profile'
          ?(
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.red}
                onPress={()=>{this.setState({deleteBoxVisible:true})}}
              >
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.green}
                onPress={()=>{this.props.navigation.navigate('EditBook',{
                  bookId:this.state.bookId,
                  thisProps:this.props,
                  refresh:this._query,
                  refreshProfile:this.props.navigation.getParam('refresh')?this.props.navigation.getParam('refresh'):null
                })}}
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>      
            </View>
          )
          :null}
        </ScrollView>

        {/*pop out box for cancel trade*/}
        <Modal visible={this.state.deleteBoxVisible}>
          <View>
            <View style={styles.popoutBoxBackground}></View>
            <View style={styles.popoutBox}>
              <Text style={styles.popoutBoxTitle}>Sure to delete this book?</Text>
              <View style={styles.popoutActions}>
                <TouchableOpacity
                  style={styles.popoutActionOutline}
                  onPress={()=>{this.setState({deleteBoxVisible:false})}}
                >
                  <Text style={styles.popoutBackText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.popoutActionOutline}
                  onPress={()=>{
                    this.setState({deleteBoxVisible:false})
                    this._delete()
                  }}
                >
                  <Text style={styles.popoutSubmitText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  profile:{
    width:'100%',
    flexDirection:'column',
    marginTop:5,
    marginBottom:5,
    borderRadius:5
  },
  profilePic:{
    width:'100%',
    textAlign:'center',
    paddingTop:5,
    paddingBottom:5
  },
  name:{
    width:'100%',
    fontSize:18,
    fontFamily:'Raleway-Bold',
    color:'#FAFAFA',
    textAlign:'center',
    paddingTop:2,
    paddingBottom:2
  },
  details:{
    width:'100%',
    flexDirection:'column',
    padding:5,
    alignItems:"center",
  },
  detail:{
    flexDirection:'row',
    marginTop:5,
    marginBottom:5,
  },
  label:{
    width:'35%',
    fontSize:18,
    fontFamily:'Raleway-Bold',
    color:'#FAFAFA',
    paddingLeft:10
  },
  text:{
    width:'65%',
    fontSize:18,
    fontFamily:'Raleway-Regular',
    color:'#FAFAFA',
    padding:0,
  },
  owner:{
    width:'100%',
    fontSize:18,
    fontFamily:'Raleway-Bold',
    color:'#FAFAFA',
    textAlign:'center',
    marginBottom:20
  },
  description:{
    width:'65%',
    fontSize:18,
    fontFamily:'Raleway-Regular',
    color:'#FAFAFA',
    padding:0,
  },
  actions:{
    flexDirection:'row',
    padding:10,
  },
  trade:{
    width:'100%',
    backgroundColor:'#4CBB17',
    borderRadius:5,
    alignItems:'center',
    padding:10,
  },
  red:{
    width:'35%',
    backgroundColor:'#B80F0A',
    borderRadius:5,
    alignItems:'center',
    padding:10,
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
  popoutBoxBackground:{
    height:'100%',
    backgroundColor:'#424242',
  },
  popoutBox:{
    flexDirection:'column',
    width:'80%',
    backgroundColor:'#212121',
    borderRadius:10,
    position:'absolute',
    marginLeft:'10%',
    marginRight:'10%',
    marginTop:'50%',
    marginBottom:'50%'
  },
  popoutBoxTitle:{
    width:'100%',
    fontFamily:'Raleway-Bold',
    fontSize:15,
    color:'#FAFAFA',
    textAlign:'center',
    padding:50,
    paddingBottom:20,
  },
  popoutActions:{
    width:'100%',
    flexDirection:'row',
    padding:20,
    justifyContent:'space-between'
  },
  popoutActionOutline:{
    width:'45%',
    borderRadius:5,
    alignItems:'center',
    padding:10,
  },
  popoutBackText:{
    fontFamily:'Raleway-Bold',
    fontSize:15,
    color:'#B80F0A',
  },
  popoutSubmitText:{
    fontFamily:'Raleway-Bold',
    fontSize:15,
    color:'#4CBB17',
  }
});
