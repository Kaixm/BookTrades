import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView, FlatList, TouchableHighlight, TouchableOpacity } from "react-native";

//import icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//import components
import AppHeader from "../components/AppHeader";

export default class StartTradeScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      selected:[],
      selectedNumber:0,
    }
  }

  render(){
    return(
      <View style={styles.container}>
      <AppHeader thisProps={this.props}></AppHeader>
        <Text style={styles.title}>Select book(s) to give!</Text>
        <FlatList
          style={styles.list}
          data={testData}
          keyExtractor={item=>item.id}
          renderItem={({item})=>{
            return(
              <TouchableHighlight style={[styles.bookContainer,{backgroundColor:this.state.selected.includes(item.id)?'#424242':'transparent'}]}
                  underlayColor={'#424242'}
                  onPress={()=>{
                    this.state.selected.includes(item.id)
                    ?this.state.selected.splice(this.state.selected.indexOf(item.id),1)
                    :this.state.selected.push(item.id)
                    this.setState({
                      selected:[...this.state.selected],
                      selectedNumber:[...this.state.selected].length
                    })
                    console.log(this.state.selectedNumber)
                    //add to selected
                  }}  
              >
                  <View style={styles.book}>
                    <View style={styles.bookIcon}><FontAwesome5 name={'book'} size={25} color={'#FAFAFA'}></FontAwesome5></View>
                    <Text style={styles.bookName}>{item.name}</Text>
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
              ?(
                //add to trade with status Requesting
                //remove the selected book from repo
                this.props.navigation.goBack(),
                this.props.navigation.getParam('thisProps').navigation.goBack()
              )
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
