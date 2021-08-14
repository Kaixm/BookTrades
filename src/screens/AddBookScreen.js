import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';

//import components
import AppHeader from "../components/AppHeader";

type Props = {};
export default class AddBookScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Add Book',
  };

  constructor(props) {
    super(props)

    this.state = {
      owner: '',
      name: '',
      genre: '',
      language: '',
      year: '',
      condition: '',
      description: '',
      fromHomeScreen:true,
    };

  }

  /*_insert() {
    this.db.transaction((tx) => {
      tx.executeSql('INSERT INTO repo(owner,name,genre,language,year,condition,description) VALUES(?,?,?,?,?,?,?)', [
        this.state.owner,
        this.state.name,
        this.state.genre,
        this.state.language,
        this.state.year,
        this.state.condition,
        this.state.description,
      ]);
    });

    this.props.navigation.getParam('refresh')();
    this.props.navigation.goBack();
  }*/

  render() {
    return (
      <View style={styles.container}>
      <AppHeader thisProps={this.props}></AppHeader>
      <View>
      <ScrollView>
        <Text style={styles.owner} editable={false}>{this.state.owner}</Text>
          <View style={styles.details}>
            <View style={styles.detail}>
                <Text style={styles.label}>Book Name: </Text>
                <TextInput style={styles.text} editable={true} value={this.state.name}
                 onChangeText={(name) => { this.setState({ name })}}></TextInput>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Genre: </Text>
                <TextInput style={styles.text} editable={true} value={this.state.genre}
                 onChangeText={(genre) => { this.setState({ genre })}}></TextInput>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Language: </Text>
                <TextInput style={styles.text} editable={true} value={this.state.language}
                  onChangeText={(language) => { this.setState({ language })}}></TextInput>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Year: </Text>
                <TextInput style={styles.text} editable={true} value={this.state.year}
                 onChangeText={(year) => { this.setState({ year })}}></TextInput>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Condition: </Text>
                <TextInput style={styles.text} editable={true} value={this.state.condition}
                 onChangeText={(condition) => { this.setState({ condition })}}></TextInput>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Description: </Text>
                <TextInput style={styles.text} editable={true} multiline={true} value={this.state.description}
                 onChangeText={(description) => { this.setState({ description })}}></TextInput>
          </View>
          {this.state.fromHomeScreen
          ?(
            <View style={styles.actions}>
                    <TouchableOpacity style={styles.green}
                    //onPress = 
                    >
                <Text style={styles.actionText}>Add Book</Text>
              </TouchableOpacity>      
            </View>
          )
          : null}
          {this.state.fromHomeScreen
          ?(
            <View style={styles.actions}>
                    <TouchableOpacity style={styles.red}
                    onPress={()=>{
                      this.props.navigation.navigate('Repository')
                }}
                    >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>      
            </View>
          )
          :null}
        </View>
        </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    backgroundColor:'#212121',
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
  actions:{
    flexDirection:'row',
    padding: 10,
    
  },
  green:{
    width:'100%',
    backgroundColor:'#4CBB17',
    borderRadius:5,
    alignItems:'center',
    padding:10,
  },
  red:{
    width:'100%',
    backgroundColor:'#E64140',
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