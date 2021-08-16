import React,{Component} from "react";
import { Text, StyleSheet, Image, View, ScrollView, TouchableOpacity, FlatList, TouchableHighlight, Alert, Modal, TextInput } from "react-native";
import { StackActions,NavigationActions } from "react-navigation";

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//import components
import AppHeader from "../components/AppHeader";
import BookContainer from "../components/BookContainer";

//prevent LOGIN back to PROFILE once back button pressed
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

//testData
const testData=[
  {
    id:'1',
    name:'Book 1'
  },
  {
    id:'2',
    name:'Book 2'
  },
]

export default class ProfileScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      id:'',

      logoutBoxVisible:false,
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
          <MaterialCommunityIcons  style={styles.profilePic}
            name={this.state.gender!=""?(this.state.gender=="Male"?'face':'face-woman'):''} 
            size={50} 
            color={this.state.gender!=""?(this.state.gender=="Male"?'#00BECC':'#EA3C53'):''}>
          </MaterialCommunityIcons>
          <Text style={styles.name} editable={false}>{this.state.name}</Text>
          <Text style={styles.text}>{this.state.email}</Text>
          <Text style={styles.text}>{this.state.phoneNumber}</Text>
          <View style={styles.logout}>
            <TouchableOpacity
              style={styles.logoutOutline}
              onPress={()=>{this.setState({logoutBoxVisible:true})}}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.booksContainer}>
            <View style={styles.subheader}>
              <Text style={styles.subheaderText}>Your Books</Text>
              <TouchableOpacity
                onPress={()=>{
                  this.props.navigation.navigate('AddBook')
                }}
              >
                <MaterialIcons name={'add'} size={20} color={'#FAFAFA'}></MaterialIcons>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            style={styles.list}
            data={testData}
            renderItem={({item})=>{
              return(
                <BookContainer
                  bookId={item.id}
                  bookName={item.name}
                  fromScreen={'Profile'}
                  thisProps={this.props}
              ></BookContainer>
              )
            }}
          ></FlatList>

        {/*pop out box for cancel trade*/}
        <Modal visible={this.state.logoutBoxVisible}>
          <View>
            <View style={styles.popoutBoxBackground}></View>
            <View style={styles.popoutBox}>
              <Text style={styles.popoutBoxTitle}>Sure to logout?</Text>
              <View style={styles.popoutActions}>
                <TouchableOpacity
                  style={styles.popoutActionOutline}
                  onPress={()=>{this.setState({logoutBoxVisible:false})}}
                >
                  <Text style={styles.popoutBackText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.popoutActionOutline}
                  onPress={()=>{
                    /*logout*/
                    this.props.navigation.dispatch(resetAction)
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
  name:{
    width:'100%',
    fontSize:18,
    fontFamily:'Raleway-Bold',
    color:'#FAFAFA',
    textAlign:'center',
  },
  actions:{
    flexDirection:'row',
    padding:10,
  },
  green:{
    width:'100%',
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
  booksContainer:{
    margin:10,
    marginBottom:0,
  },
  list:{
    margin:10,
    marginTop:0,
    marginBottom:20
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
  subheaderText:{
    fontFamily:'Raleway-Bold',
    fontSize:20,
    color:'#FAFAFA',
    textAlign:'center',
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
  logout:{
    width:'100%',
    alignItems:'center',
    padding:20
  },
  logoutOutline:{
    width:'30%',
    borderWidth:2,
    borderColor:'#B80F0A',
    borderRadius:5,
    padding:5,
  },
  logoutText:{
    textAlign:'center',
    fontFamily:'Raleway-Bold',
    fontSize:15,
    color:'#B80F0A',
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