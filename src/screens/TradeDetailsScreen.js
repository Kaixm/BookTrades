import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, FlatList, TouchableHighlight, Alert, SectionList, Modal } from "react-native";

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//import components
import AppHeader from "../components/AppHeader";
import BookContainer from "../components/BookContainer";

//test data
const testData=[
  {
    title:"You Give",
    data:[
      {
        id:'1',
        name:'Book 1'
      },
    ]
  },
  {
    title:"You Receive",
    data:[
      {
        id:'5',
        name:'Book 3'
      },
    ]
  }
]

export default class TradeDetailsScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      tradeId:'',
      userId:'',
      
      date:this.props.navigation.getParam('date')?this.props.navigation.getParam('date'):"",
      status:this.props.navigation.getParam('status')?this.props.navigation.getParam('status'):"",
      statusColor:this.props.navigation.getParam('status')?(this.props.navigation.getParam('status')=="Done"?'#4CBB17':(this.props.navigation.getParam('status')=="Exchanging"?'#FCE205':'#B80F0A')):'#FAFAFA',
      
      bookId:this.props.navigation.getParam('bookId')?this.props.navigation.getParam('bookId'):"",
      bookName:this.props.navigation.getParam('bookName')?this.props.navigation.getParam('bookName'):"",

      declineBoxVisible:false,
      rateBoxVisible:false,
      cancelBoxVisible:false,

      rateFrownSelected:false,
      rateMehSelected:false,
      rateSmileSelected:false,

      rateFrownColor:'#FAFAFA',
      rateMehColor:'#FAFAFA',
      rateSmileColor:'#FAFAFA',
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
        <TouchableHighlight
            style={styles.profile}
            underlayColor={'#424242'}
            onPress={()=>{this.props.navigation.navigate('ViewProfile',{
              userId:this.state.userId,
            })}}
          >
            <View>
              <MaterialCommunityIcons  style={styles.profilePic}
                name={this.state.gender!=""?(this.state.gender=="Male"?'face':'face-woman'):''} 
                size={50} 
                color={this.state.gender!=""?(this.state.gender=="Male"?'#00BECC':'#EA3C53'):''}>
              </MaterialCommunityIcons>
              <Text style={styles.name} editable={false}>{this.state.name}</Text>
            </View>
          </TouchableHighlight>
        <Text style={styles.text}>{this.state.date}</Text>
        <Text style={[styles.text,{color:this.state.statusColor,fontFamily:'Raleway-Bold'}]}>{this.state.status}</Text>
        <SectionList
          style={styles.giveReceiveContainer}
          sections={testData}
          renderSectionHeader={({section:{title}})=>{
            return(
              <Text style={styles.subheader}>{title}</Text>
            )
          }}
          renderItem={({item})=>{
            return(
              <BookContainer
                bookId={item.id}
                bookName={item.name}
                fromScreen={'Trade'}
                thisProps={this.props}
              ></BookContainer>
            )
          }}
        ></SectionList>
        {this.state.status=="Done"
        ?null
        :(this.state.status=="Exchanging"
          ?(
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.red}
                onPress={()=>{this.setState({cancelBoxVisible:true})}}
              >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.green}
                onPress={()=>{this.setState({rateBoxVisible:true})}}
              >
                <Text style={styles.actionText}>Rate & Complete</Text>
              </TouchableOpacity>      
            </View>
          )
          :(
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.red}
                onPress={()=>{this.setState({declineBoxVisible:true})}}
              >
                <Text style={styles.actionText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.green}
                onPress={()=>{
                  /*accept trade change state to Exchanging*/
                  this.props.navigation.goBack()
                }}
              >
                <Text style={styles.actionText}>Accept</Text>
              </TouchableOpacity>      
            </View>
          )
        )}

        {/*pop out box for decine trade request*/}
        <Modal visible={this.state.declineBoxVisible}>
          <View>
            <View style={styles.popoutBoxBackground}></View>
            <View style={styles.popoutBox}>
              <Text style={styles.popoutBoxTitle}>Sure to decline this trade request?</Text>
              <View style={styles.popoutActions}>
                <TouchableOpacity
                  style={styles.popoutActionOutline}
                  onPress={()=>{this.setState({declineBoxVisible:false})}}
                >
                  <Text style={styles.popoutBackText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.popoutActionOutline}
                  onPress={()=>{
                    /*delete trade*/
                    this.setState({declineBoxVisible:false})
                    this.props.navigation.goBack()
                  }}
                >
                  <Text style={styles.popoutSubmitText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/*pop out box for cancel trade*/}
        <Modal visible={this.state.cancelBoxVisible}>
          <View>
            <View style={styles.popoutBoxBackground}></View>
            <View style={styles.popoutBox}>
              <Text style={styles.popoutBoxTitle}>Sure to cancel this trade?</Text>
              <View style={styles.popoutActions}>
                <TouchableOpacity
                  style={styles.popoutActionOutline}
                  onPress={()=>{this.setState({cancelBoxVisible:false})}}
                >
                  <Text style={styles.popoutBackText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.popoutActionOutline}
                  onPress={()=>{
                    /*delete trade*/
                    this.setState({cancelBoxVisible:false})
                    this.props.navigation.goBack()
                  }}
                >
                  <Text style={styles.popoutSubmitText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/*pop out box for rate and complete trade*/}
        <Modal visible={this.state.rateBoxVisible}>
          <View>
            <View style={styles.popoutBoxBackground}></View>
            <View style={styles.popoutBox}>
              <Text style={styles.popoutBoxTitle}>Rate this user to complete!</Text>
              <View style={styles.rateIcons}>
                
                <TouchableOpacity
                  onPress={()=>{this.setState({
                    rateFrownSelected:true,
                    rateMehSelected:false,
                    rateSmileSelected:false,
                    rateFrownColor:'#B80F0A',
                    rateMehColor:'#FAFAFA',
                    rateSmileColor:'#FAFAFA'
                  })}}
                >
                  <AntDesign name={'frowno'} size={40} color={this.state.rateFrownColor}></AntDesign>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>{this.setState({
                    rateFrownSelected:false,
                    rateMehSelected:true,
                    rateSmileSelected:false,
                    rateFrownColor:'#FAFAFA',
                    rateMehColor:'#FCE205',
                    rateSmileColor:'#FAFAFA'
                  })}}
                >
                  <AntDesign name={'meh'} size={40} color={this.state.rateMehColor}></AntDesign>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>{this.setState({
                    rateFrownSelected:false,
                    rateMehSelected:false,
                    rateSmileSelected:true,
                    rateFrownColor:'#FAFAFA',
                    rateMehColor:'#FAFAFA',
                    rateSmileColor:'#4CBB17'
                  })}}
                >
                  <AntDesign name={'smileo'} size={40} color={this.state.rateSmileColor}></AntDesign>
                </TouchableOpacity>
              </View>
              <View style={styles.popoutActions}>
                <TouchableOpacity
                  style={styles.popoutActionOutline}
                  onPress={()=>{this.setState({rateBoxVisible:false})}}
                >
                  <Text style={styles.popoutBackText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.popoutActionOutline}
                  onPress={()=>{
                    /*submit rate*/
                    this.setState({rateBoxVisible:false})
                    this.props.navigation.goBack()
                  }}
                >
                  <Text style={styles.popoutSubmitText}>Submit</Text>
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
    justifyContent:'center',
    alignItems:'center'
  },
  profile:{
    width:'100%',
    flexDirection:'column',
    margin:5,
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
    marginTop:20,
  },
  subheader:{
    fontFamily:'Raleway-Bold',
    fontSize:20,
    backgroundColor:'#424242',
    color:'#FAFAFA',
    textAlign:'center',
    borderBottomWidth:1,
    borderBottomColor:'#212121',
    padding:5,
  },
  actions:{
    flexDirection:'row',
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
  rateIcons:{
    width:'100%',
    flexDirection:'row',
    padding:50,
    paddingBottom:20,
    justifyContent:'space-between'
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