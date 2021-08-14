import React, {Component} from 'react';
import { Text, View, StyleSheet, Alert, TouchableHighlight } from 'react-native';

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// BookContainer
export default class BookContainer extends Component<Props>{
  constructor(props){
    super(props);
    this.state={
      id:this.props.id?this.props.id:"",
      gender: this.props.user_id ? this.props.gender : "",
      owner: this.props.owner ? this.props.owner: "",
      name:this.props.name?this.props.name:"",
      genre: this.props.genre? this.props.genre: "",
      language: this.props.language? this.props.language: "",
      year:this.props.year?this.props.year:"",
      condition: this.props.condition? this.props.condition: "",
      description:this.props.decription?this.props.description:"",
    }
  }

  render(){
    return (
      <TouchableHighlight style={styles.repoContainer}
      underlayColor={'#616161'}
      onPress={
        this.props.thisProps
        ?()=>this.props.thisProps.navigation.navigate('RepoBookDetails',{
          id: this.state.id,
          gender: this.state.gender,
          owner: this.state.owner,
          name: this.state.name,
          genre:this.state.genre,
          language:this.state.language,
          year:this.state.year,
          condition:this.state.condition,
          description:this.state.description,
          })
        :()=>{}}  
    >
        <View style={styles.repo}>
          <View style={styles.repoBookIcon}>
            <MaterialCommunityIcons 
              name="book"
              size={80} 
              color='#AC94F4'>
            </MaterialCommunityIcons>
          </View>
          <View style={styles.repoDetails}>
            <View style={styles.repoDetail}>
              <Text style={styles.repoLabel}>Name : </Text>
              <Text style={styles.repoText}>{this.state.name}</Text>
            </View>
            <View style={styles.repoDetail}>
              <Text style={styles.repoLabel}>Genre : </Text>
              <Text style={styles.repoText}>{this.state.genre}</Text>
            </View>
            <View style={styles.repoDetail}>
              <Text style={styles.repoLabel}>Language : </Text>
              <Text style={styles.repoText}>{this.state.language}</Text>
            </View>
            <View style={styles.repoDetail}>
              <Text style={styles.repoLabel}>Year : </Text>
              <Text style={styles.repoText}>{this.state.year}</Text>
            </View>
            <View style={styles.repoDetail}>
              <Text style={styles.repoLabel}>Condition : </Text>
              <Text style={styles.repoText}>{this.state.condition}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
};

const styles = StyleSheet.create({
  repoContainer:{
    flexDirection:"row",
    margin:10,
    marginBottom:0,
    backgroundColor:'#424242',
    borderRadius:5,
  },
  repo:{
    width:'100%', 
    flexDirection:'row'
  },
  repoBookIcon:{
    width:'25%',
    flexDirection:'row',
    padding: 5,
    alignItems:'center',
    justifyContent: 'center',
  },
  repoDetails:{
    width:'75%',
    flexDirection:'column',
    padding:8,
    alignItems:"center",
  },
  repoDetail:{
    flexDirection:'row',
  },
  repoLabel:{
    width:'35%',
    fontSize:14,
    fontFamily:'Raleway-Bold',
    color:'#FAFAFA',
    paddingLeft:10
  },
  repoText:{
    width:'65%',
    fontSize:14,
    fontFamily:'Raleway-Regular',
    color:'#FAFAFA',
  }
});
