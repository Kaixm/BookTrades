import React, {Component} from 'react';
import { Text, View, StyleSheet, Alert, TouchableHighlight } from 'react-native';

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class TradeContainer extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      gender:this.props.gender?this.props.gender:"",
      name:this.props.name?this.props.name:"",
      date:this.props.date?this.props.date:"",
      status:this.props.status?this.props.status:"",
      statusColor:this.props.status?(this.props.status=="Completed"?'#4CBB17':'#B80F0A'):'#FAFAFA',
    }
  }

  render(){
    return(
      <TouchableHighlight style={styles.container}
        underlayColor={'#616161'}
        onPress={
          this.props.thisProps
          ?()=>this.props.thisProps.navigation.navigate('TradeDetails',{
            gender:this.state.gender,
            name:this.state.name,
            date:this.state.date,
            status:this.state.status
            })
          :()=>{}}  
      >
        <View style={styles.trade}>
          <View style={styles.profilePic}>
            <MaterialCommunityIcons 
              name={this.state.gender!=""?(this.state.gender=="Male"?'face':'face-woman'):''} 
              size={70} 
              color={this.state.gender!=""?(this.state.gender=="Male"?'#00BECC':'#EA3C53'):''}>
            </MaterialCommunityIcons>
          </View>
          <View style={styles.details}>
            <View style={styles.detail}>
              <Text style={styles.label}>Name: </Text>
              <Text style={styles.text}>{this.state.name}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Date: </Text>
              <Text style={styles.text}>{this.state.date}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Status: </Text>
              <Text style={[styles.text,{color:this.state.statusColor,fontFamily:'Raleway-Bold'}]}>{this.state.status}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
};

const styles = StyleSheet.create({
  container:{
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
