import React, {Component} from 'react';
import { Text, View, StyleSheet, Alert, TouchableHighlight } from 'react-native';

//import icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// BookContainer
export default class BookContainer extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      bookId:this.props.bookId?this.props.bookId:null,
      userId:this.props.userId?this.props.userId:null,
      bookName:this.props.bookName?this.props.bookName:null,
      fromScreen:this.props.fromScreen?this.props.fromScreen:null,
      thisProps:this.props.thisProps?this.props.thisProps:null,
      refresh:this.props.refresh?this.props.refresh:null,
    }
  }

  render(){
    return (
      <TouchableHighlight style={styles.bookContainer}
        underlayColor={'#424242'}
          onPress={()=>this.props.thisProps.navigation.navigate('BookDetails',{
            bookId:this.state.bookId,
            userId:this.state.userId,
            fromScreen:this.state.fromScreen,
            refresh:this.state.refresh
          })}  
      >
        <View style={styles.book}>
          <View style={styles.bookIcon}><FontAwesome5 name={'book'} size={25} color={'#FAFAFA'}></FontAwesome5></View>
          <Text style={styles.bookName}>{this.state.bookName}</Text>
        </View>
      </TouchableHighlight>
    );
  }
};

const styles = StyleSheet.create({

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
