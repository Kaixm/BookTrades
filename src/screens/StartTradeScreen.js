import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView, FlatList, TouchableHighlight, TouchableOpacity } from "react-native";

//import icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//import components
import AppHeader from "../components/AppHeader";

//test data
const testData=[
  {
    id:'1',
    name:'Book 1',
    genre:'Book',
    language:'English',
    year:'2021',
    condition:'New',
    description:'I just bought an extra one, wanna to exhange here'
  },
  {
    id:'2',
    name:'Book 2',
    genre:'Book',
    language:'English',
    year:'2021',
    condition:'New',
    description:'I just bought an extra one, wanna to exhange here'
  },
  {
    id:'3',
    name:'Book 3',
    genre:'Book',
    language:'English',
    year:'2021',
    condition:'New',
    description:'I just bought an extra one, wanna to exhange here'
  }
]

export default class StartTradeScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      selected:[],
      selectedNumber:0
    }
  }

  render(){
    return(
      <View style={styles.container}>
      <AppHeader thisProps={this.props}></AppHeader>
        <Text style={styles.title}>Select book(s) to give!</Text>
        <FlatList
          data={testData}
          keyExtractor={item=>item.id}
          renderItem={({item})=>{
            return(
              <TouchableHighlight
                underlayColor={'#424242'}
                onPress={()=>{
                  //add to array the book selected
                  //selected number ++
                }}  
              >
                <View style={styles.bookContainer}>
                  <View style={styles.bookIcon}><FontAwesome5 name={'book'} size={100} color={'#FAFAFA'}></FontAwesome5></View>
                  <View style={styles.details}>
                    <View style={styles.detail}>
                      <Text style={styles.label}>Book Name: </Text>
                      <Text style={styles.text}>{item.name}</Text>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.label}>Genre: </Text>
                      <Text style={styles.text}>{item.genre}</Text>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.label}>Language: </Text>
                      <Text style={styles.text}>{item.language}</Text>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.label}>Year: </Text>
                      <Text style={styles.text}>{item.year}</Text>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.label}>Condition: </Text>
                      <Text style={styles.text}>{item.condition}</Text>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.label}>Description: </Text>
                      <Text style={styles.text}>{item.description}</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            )
          }}
        ></FlatList>
        <View style={styles.selected}>
          <Text style={styles.selectedLabel}>Selected: </Text>
          <Text style={styles.selectedNumber}>{}</Text>
          <TouchableOpacity
            style={styles.green}
            onPress={()=>{
              //add to trade with status Requesting
              //remove the selected book from repo
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
    color:'#4CBB17',
    textAlign:'center',
    padding:10
  },
  bookContainer:{
    flexDirection:'column',
    borderRadius:5,
    borderWidth:2,
    borderColor:'#424242',
    margin:10,
    padding:10,
  },
  bookIcon:{
    height:'100%',
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    opacity:0.1,
    margin:10
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
