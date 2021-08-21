import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, FlatList, TouchableHighlight, Alert, SectionList, Modal } from "react-native";

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//import components
import AppHeader from "../components/AppHeader";
import BookContainer from "../components/BookContainer";

//import login user id
import loginUserId from '../../LoginUserId';

//server path
let config=require('../../Config');

export default class TradeDetailsScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      loginUserId:loginUserId.getUserId(),
      tradeId:this.props.navigation.getParam('tradeId')?this.props.navigation.getParam('tradeId'):null,
      date:this.props.navigation.getParam('date')?this.props.navigation.getParam('date'):null,
      status:this.props.navigation.getParam('status')?this.props.navigation.getParam('status'):null,
      statusColor:this.props.navigation.getParam('status')?(this.props.navigation.getParam('status')=="Done"?'#4CBB17':(this.props.navigation.getParam('status')=="Exchanging"?'#FCE205':'#B80F0A')):'#FAFAFA',
      user1Id:this.props.navigation.getParam('user1Id')?this.props.navigation.getParam('user1Id'):null,
      user2Rate:this.props.navigation.getParam('user2Rate')?this.props.navigation.getParam('user2Rate'):0,
      userId:this.props.navigation.getParam('userId')?this.props.navigation.getParam('userId'):null,
      userName:this.props.navigation.getParam('userName')?this.props.navigation.getParam('userName'):null,
      gender:this.props.navigation.getParam('gender')?this.props.navigation.getParam('gender'):null,

      books:[],
      tradeDetails:[],

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
    this._query = this._query.bind(this);
    this._delete = this._delete.bind(this);
  }

  componentDidMount() {
    this._query();
  }

  async _query() {
    await fetch(config.settings.serverPath+'/api/book',{method:'GET'})
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

    await fetch(config.settings.serverPath+'/api/tradeDetails',{method:'GET'})
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

  async _delete() {
    await fetch(config.settings.serverPath+'/api/trade/'+this.state.tradeId, { 
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tradeId: this.state.tradeId,
      }),
    })
    .then(response => {
      if (!response.ok) {
        Alert.alert('Error', response.status.toString());
        throw Error('Error ' + response.status);
      }
      return response.json();
    })
    .then(responseJson => {
      if (responseJson.affected == 0) {
        Alert.alert('Error deleting record');
      }
    })
    .catch(error => {
      console.error(error);
    });

    for(let i=0;i<this.state.tradeDetails.length;i++){
      if(this.state.tradeDetails[i].tradeId==this.state.tradeId){
        await fetch(config.settings.serverPath+'/api/tradeDetails/'+this.state.tradeDetails[i].tradeDetailsId, { 
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tradeDetailsId: this.state.tradeDetailsId,
          }),
        })
        .then(response => {
          if (!response.ok) {
            Alert.alert('Error', response.status.toString());
            throw Error('Error ' + response.status);
          }
          return response.json();
        })
        .then(responseJson => {
          if (responseJson.affected == 0) {
            Alert.alert('Error deleting record');
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
    }
    this.props.navigation.getParam('refresh')();
    this.props.navigation.goBack();
  }

  filter(){
    let filtered=[];
    let giveData=[];
    let receiveData=[];
    for(let i=0;i<this.state.tradeDetails.length;i++){
      if(this.state.tradeDetails[i].tradeId==this.state.tradeId){
        for(let j=0;j<this.state.books.length;j++){
          if(this.state.tradeDetails[i].bookId==this.state.books[j].bookId){
            if(this.state.tradeDetails[i].userId==this.state.loginUserId){
              giveData.push(this.state.books[j]);
              break;
            }
            else if(this.state.tradeDetails[i].userId==this.state.userId){
              receiveData.push(this.state.books[j]);
              break;
            }
          }
        }
      }
    }
    filtered.push({title:'You Give',data:[...giveData]})
    filtered.push({title:'You Receive',data:[...receiveData]})
    return filtered;
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
                name={this.state.gender?(this.state.gender=="Male"?'face':'face-woman'):''} 
                size={50} 
                color={this.state.gender?(this.state.gender=="Male"?'#00BECC':'#EA3C53'):''}>
              </MaterialCommunityIcons>
              <Text style={styles.name} editable={false}>{this.state.userName}</Text>
            </View>
          </TouchableHighlight>
        <Text style={styles.text}>{this.state.date}</Text>
        <Text style={[styles.text,{color:this.state.statusColor,fontFamily:'Raleway-Bold'}]}>{this.state.status}</Text>
        <SectionList
          style={styles.giveReceiveContainer}
          sections={this.filter()}
          keyExtractor={item=>item.tradeId}
          renderSectionHeader={({section:{title}})=>{
            return(
              <Text style={styles.subheader}>{title}</Text>
            )
          }}
          renderItem={({item})=>{
            return(
              <BookContainer
                bookId={item.bookId}
                bookName={item.bookName}
                userId={item.userId}
                fromScreen={'Trade'}
                thisProps={this.props}
              ></BookContainer>
            )
          }}
        ></SectionList>
        {
          this.state.loginUserId==this.state.user1Id
          ?(
            this.state.status=='Done'
            ?(
              console.log(this.state.user2Rate),
              this.state.user2Rate==0
              ?(
                console.log('aa'),
                <View style={styles.actions}>
                  <TouchableOpacity 
                    style={styles.singleGreen}
                    onPress={()=>{this.setState({rateBoxVisible:true})}}
                  >
                    <Text style={styles.actionText}>Rate</Text>
                  </TouchableOpacity>
                </View>
              )
              :null
            )
            :(
              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.singleRed}
                  onPress={()=>{this.setState({cancelBoxVisible:true})}}
                >
                  <Text style={styles.actionText}>Cancel</Text>
                </TouchableOpacity> 
              </View>
            )
          )
          :(
            this.state.status=='Done'
            ?null
            :(
              this.state.status=='Exchanging'
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
            )
          )
        }

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
                    this._delete()
                    this.setState({declineBoxVisible:false})
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
                    this._delete()
                    this.setState({cancelBoxVisible:false})
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
  singleRed:{
    width:'100%',
    backgroundColor:'#B80F0A',
    borderRadius:5,
    alignItems:'center',
    padding:10,
  },
  singleGreen:{
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