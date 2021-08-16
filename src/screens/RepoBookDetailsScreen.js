import React,{Component} from "react";
import { Alert, Image, Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { FloatingAction } from 'react-native-floating-action';


//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import components
import AppHeader from "../components/AppHeader";


const actions = [{
    text: 'Edit',
    color: '#AC94F4',
    //icon: require('../Icons/edit.png'),
    name: 'edit',
    position: 2
  },{
    text: 'Delete',
    color: '#AC94F4',
    //icon: require('../Icons/edit.png'),
    name: 'delete',
    position: 1
}];

type Props = {};
export default class BookDetailsScreen extends Component<Props>{
  constructor(props){
    super(props)
      
    this.state = {
        id: "00001",
        gender: "Male",
        owner: "Lim Kai Zhe",
        name: "You are my glory",
        genre: "Romance",
        language: "Chinese",
        year: "2017",
        condition: "9/10",
        description: "nice story",
        fromHomeScreen: true,
        repoData: null,
      };
  }
  /*_query() {
    this.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM repo WHERE id = ?', [this.state.id], (tx, results) => {
        if(results.rows.length) {
          this.setState({
            repoData: results.rows.item(0),
          })
        }
      })
    });
  }*/

 

  render() {
    let repoData = this.state.repoData;
    return(
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
        <View>
        <ScrollView>
          <MaterialCommunityIcons style={styles.bookIcon}
              name="book"
              size={120} 
              color='#AC94F4'>
            </MaterialCommunityIcons>
          <Text style={styles.owner} editable={false}>{this.state.owner}</Text>
          <View style={styles.details}>
            <View style={styles.detail}>
              <Text style={styles.label}>Book Name: </Text>
                <TextInput style={styles.text} editable={false} value={repoData ? repoData.name: ''}>{this.state.name}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Genre: </Text>
              <TextInput style={styles.text} editable={false} value={repoData ? repoData.genre: ''}>{this.state.genre}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Language: </Text>
                <TextInput style={styles.text} editable={false} value={repoData ? repoData.language : ''}>{this.state.language}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Year: </Text>
                <TextInput style={styles.text} editable={false} value={repoData ? repoData.year: ''}>{this.state.year}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Condition: </Text>
                <TextInput style={styles.text} editable={false} value={repoData ? repoData.condition: ''}>{this.state.condition}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Description: </Text>
                <TextInput style={styles.description} editable={false} multiline={true} value={repoData ? repoData.description : ''}>{this.state.description}</TextInput>
            </View>
        </View>
        {this.state.fromHomeScreen
          ?(
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.green}
                onPress={()=>{
                  this.props.navigation.navigate('StartTrade')
                }}
              >
                <Text style={styles.actionText}>Trade</Text>
              </TouchableOpacity>      
            </View>
          )
        : null}
        {this.state.fromHomeScreen
          ?(
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.green}
                onPress={()=>{
                  this.props.navigation.navigate('EditBook')
                }}
              >
                <Text style={styles.actionText}>Edit Book</Text>
              </TouchableOpacity>      
            </View>
          )
          : null}
            
          
          </ScrollView>
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
  bookIcon:{
    width:'100%',
    textAlign:'center',
    paddingTop:5,
    paddingBottom:5
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
});
