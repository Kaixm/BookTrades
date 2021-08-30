import React, { Component } from 'react';
import {StyleSheet, TextInput, Text, View, ScrollView, TouchableOpacity, Picker, Alert} from 'react-native';

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import components
import AppHeader from "../components/AppHeader";

//import login user id
import loginUserId from '../../LoginUserId';

//server path
let config=require('../../Config');

const currentYear=new Date().getFullYear();
const yearRange=[];

export default class EditBookScreen extends Component<Props> {
  constructor(props) {
    super(props)
    for(let i=currentYear-50;i<=currentYear;i++){
      yearRange.push(i.toString());
    }
    this.state = {
      bookId:this.props.navigation.getParam('bookId')?this.props.navigation.getParam('bookId'):null,
      userId:loginUserId.getUserId(),
      bookName:null,
      genre:null,
      language:null,
      year:null,
      condition:null,
      description:null,

      thisProps:this.props.navigation.getParam('thisProps')?this.props.navigation.getParam('thisProps'):null
    };
    this._query = this._query.bind(this);
    this._update = this._update.bind(this);
  }

  componentDidMount() {
    this._query();
  }

  async _query() {
    let url = config.settings.serverPath + '/api/book/' + this.state.bookId;
    await fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);}
        return response.json();})
      .then(book => {
        this.setState({
          bookName:book.bookName,
          genre:book.genre,
          language:book.language,
          year:book.year,
          condition:book.condition,
          description:book.description
        });
      })
      .catch(error => {
        console.error(error);
        this._query()
      });
  }

  async _update() {
    let url = config.settings.serverPath + '/api/book/' + this.state.bookId;
    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookName: this.state.bookName,
        genre: this.state.genre,
        language: this.state.language,
        year: this.state.year,
        condition: this.state.condition,
        description: this.state.description,
      }),
    })
    .then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());
        throw Error('Error ' + response.status);
      }
      return response.json()
    })
    .then((responseJson) => {
      if(responseJson.affected > 0) {
        this.props.navigation.getParam('refresh')();
        this.props.navigation.goBack();
        this.props.navigation.getParam('refreshProfile')();
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
          <View style={styles.details}>
            <View style={styles.detail}>
                <Text style={styles.label}>Book Name: </Text>
                <TextInput 
                  style={styles.text} 
                  editable={true} 
                  value={this.state.bookName} 
                  placeholder={'Book name'}
                  placeholderTextColor={'#828282'}
                  onChangeText={(bookName) => { this.setState({ bookName:bookName })}}></TextInput>
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
                  selectedValue={this.state.condition}
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
                onPress={()=>{this._update()}}
            >
              <Text style={styles.actionText}>Update</Text>
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
  profilePic:{
    width:'100%',
    textAlign:'center',
    paddingTop:5,
    paddingBottom:5
  },
  owner:{
    width:'100%',
    fontSize:18,
    fontFamily:'Raleway-Bold',
    color:'#FAFAFA',
    textAlign:'center',
    marginBottom:20
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