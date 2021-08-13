import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity } from "react-native";

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import components
import AppHeader from "../components/AppHeader";

export default class BookDetailsScreen extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      id:this.props.navigation.getParam('id')?this.props.navigation.getParam('id'):"",
      gender:this.props.navigation.getParam('gender')?this.props.navigation.getParam('gender'):"",
      owner:this.props.navigation.getParam('owner')?this.props.navigation.getParam('owner'):"",
      name:this.props.navigation.getParam('name')?this.props.navigation.getParam('name'):"",
      genre:this.props.navigation.getParam('genre')?this.props.navigation.getParam('genre'):"",
      language:this.props.navigation.getParam('language')?this.props.navigation.getParam('language'):"",
      year:this.props.navigation.getParam('year')?this.props.navigation.getParam('year'):"",
      condition:this.props.navigation.getParam('condition')?this.props.navigation.getParam('condition'):"",
      description:this.props.navigation.getParam('description')?this.props.navigation.getParam('description'):"",

      fromHomeScreen:true,
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
        <ScrollView>
          <MaterialCommunityIcons  style={styles.profilePic}
            name={this.state.gender!=""?(this.state.gender=="Male"?'face':'face-woman'):''} 
            size={50} 
            color={this.state.gender!=""?(this.state.gender=="Male"?'#00BECC':'#EA3C53'):''}>
          </MaterialCommunityIcons>
          <Text style={styles.owner} editable={false}>{this.state.owner}</Text>
          <View style={styles.details}>
            <View style={styles.detail}>
              <Text style={styles.label}>Book Name: </Text>
              <TextInput style={styles.text} editable={false}>{this.state.name}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Genre: </Text>
              <TextInput style={styles.text} editable={false}>{this.state.genre}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Language: </Text>
              <TextInput style={styles.text} editable={false}>{this.state.language}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Year: </Text>
              <TextInput style={styles.text} editable={false}>{this.state.year}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Condition: </Text>
              <TextInput style={styles.text} editable={false}>{this.state.condition}</TextInput>
            </View>
            <View style={styles.detail}>
              <Text style={styles.label}>Description: </Text>
              <TextInput style={styles.description} editable={false} multiline={true}>{this.state.description}</TextInput>
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
          :null}
        </ScrollView>
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
  profilePic:{
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
