import React, { Component } from 'react';
import {StyleSheet, TextInput, Text, ScrollView, View, TouchableOpacity, Picker, Alert} from 'react-native';
import { log } from 'react-native-reanimated';

//import components
import AppHeader from "../components/AppHeader";

//import login user id
import loginUserId from '../../LoginUserId';

//server path
let config=require('../../Config');

const currentYear=new Date().getFullYear();
const yearRange=[];

export default class AddBookScreen extends Component<Props> {
  constructor(props) {
    super(props)
    for(let i=currentYear-50;i<=currentYear;i++){
      yearRange.push(i.toString());
    }
    this.state = {
      loginUserId: loginUserId.getUserId(),
      bookName: '',
      genre: 'Fiction',
      language: 'English',
      year: currentYear.toString(),
      condition: 'Good',
      description: '',
    };
    this._insert = this._insert.bind(this);
  }

  _insert() {
    let url = config.settings.serverPath + '/api/book';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.state.loginUserId,
        bookName: this.state.bookName,
        genre: this.state.genre,
        language: this.state.language,
        year: this.state.year,
        condition: this.state.condition,
        description: this.state.description,
      }),
    }).then((response) => {
      if(!response.ok) {
        throw Error('Error ' + response.status);
      }
      return response.json()
    }).then((responseJson) => {
      if(responseJson.affected > 0) {
        this.props.navigation.getParam('refresh')();
        this.props.navigation.goBack();
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    //disable the warning
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
      <AppHeader thisProps={this.props}></AppHeader>
      <View>
      <ScrollView>
        <Text style={styles.owner} editable={false}>{this.state.owner}</Text>
          <View style={styles.details}>
            <View style={styles.detail}>
                <Text style={styles.label}>Book Name: </Text>
                <TextInput 
                  style={styles.text} 
                  editable={true} 
                  value={this.state.bookName} 
                  placeholder={'Book name'}
                  placeholderTextColor={'#828282'}
                  onChangeText={(bookName)=>{this.setState({bookName:bookName})}}></TextInput>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Genre: </Text>
                <Picker 
                  style={styles.pickerInput}
                  selectedValue={this.state.genre}
                  onValueChange={(genre)=>{this.setState({genre:genre})}}
                >
                  <Picker.Item label={'Fiction'} value={'Fiction'} />
                  <Picker.Item label={'Non-Fiction'} value={'Non-Fiction'} />
                </Picker>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Language: </Text>
                <Picker 
                  style={styles.pickerInput}
                  selectedValue={this.state.language}
                  onValueChange={(language)=>{this.setState({language:language})}}
                >
                  <Picker.Item label={'English'} value={'English'} />
                  <Picker.Item label={'Chinese'} value={'Chinese'} />
                  <Picker.Item label={'Malay'} value={'Bahasa Melayu'} />
                  <Picker.Item label={'Other'} value={'Other'} />
                </Picker>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Year: </Text>
                <Picker 
                  style={styles.pickerInput}
                  selectedValue={this.state.year}
                  onValueChange={(year)=>{this.setState({year:year})}}
                >
                  {yearRange.map(item=>{return <Picker.Item label={item} value={item} />})}
                </Picker>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Condition: </Text>
                <Picker 
                  style={styles.pickerInput}
                  selectedValue={this.state.language}
                  onValueChange={(condition)=>{this.setState({condition:condition})}}
                >
                  <Picker.Item label={'Good'} value={'Good'} />
                  <Picker.Item label={'Fair'} value={'Fair'} />
                  <Picker.Item label={'Poor'} value={'Poor'} />
                </Picker>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Description: </Text>
                <TextInput 
                  style={styles.text} 
                  editable={true} 
                  multiline={true} 
                  value={this.state.description} 
                  placeholder={'Any additional comment?'}
                  placeholderTextColor={'#828282'}
                  onChangeText={(description) => { this.setState({ description:description })}}></TextInput>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.green}
                onPress={()=>{this._insert()}}
              >
                <Text style={styles.actionText}>Add</Text>
              </TouchableOpacity>      
            </View>
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
  pickerInput:{
    width:'65%',
    fontSize:20,
    fontFamily:'Raleway-Regular',
    color:'#FAFAFA',
    padding:0,
    height:30,
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
    backgroundColor:'#B80F0A',
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