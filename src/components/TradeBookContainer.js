import React, {Component} from 'react';
import { Text, View, StyleSheet, Alert, TouchableHighlight } from 'react-native';

//import icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class TradeBookContainer extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      name:this.props.name?this.props.name:"",
    }
  }

  render(){
    return(
      <TouchableHighlight style={styles.container}
        underlayColor={'#424242'}
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
        <View style={styles.book}>
          <View style={styles.icon}><FontAwesome5 name={'book'} size={25} color={'#FAFAFA'}></FontAwesome5></View>
          <Text style={styles.name}>{this.state.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
};

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    marginBottom:0,
    padding:10
  },
  book:{
    width:'100%', 
    flexDirection:'row'
  },
  icon:{
    width:'20%',
    padding:10,
    alignItems:'center',
    justifyContent:'center',
  },
  name:{
    width:'80%',
    fontSize:18,
    fontFamily:'Raleway-Regular',
    color:'#FAFAFA',
    padding:10,
    paddingLeft:20
  }
});
