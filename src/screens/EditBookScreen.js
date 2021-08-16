import React, { Component } from 'react';
import {StyleSheet, TextInput, Text, View, ScrollView, TouchableOpacity, Picker} from 'react-native';

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import components
import AppHeader from "../components/AppHeader";

const currentYear=new Date().getFullYear();
const yearRange=[];

export default class EditBookScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Edit: ' + navigation.getParam('headerTitle')
    };
  };

  constructor(props) {
    super(props)

    for(let i=currentYear-50;i<=currentYear+50;i++){
      yearRange.push(i.toString());
    }

    this.state = {
      bookId:this.props.navigation.getParam('bookId')?this.props.navigation.getParam('bookId'):"",
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

  /*_update() {
    this.db.transaction((tx) => {
      tx.executeSql('UPDATE repo SET name=?, genre=?, language=?, year=?, condition=?, description=? WHERE id=?', [
          this.state.id,
          this.state.name,
          this.state.genre,
          this.state.language,
          this.state.year,
          this.state.condition,
          this.state.description,
      ]);
    });

    this.props.navigation.getParam('refresh')();
    this.props.navigation.getParam('homeRefresh')();
    this.props.navigation.goBack();
  }*/

   /*_delete() {
    Alert.alert('Confirm Deletion', 'Delete `'+ this.state.bookData.name +'`?', [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          this.db.transaction((tx) => {
            tx.executeSql('DELETE FROM repo WHERE id = ?', [this.state.id])
          });

          this.props.navigation.getParam('refresh')();
          this.props.navigation.goBack();
        },
      },
    ], { cancelable: false });
  }*/

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
                  //value={} 
                  placeholder={'Book name'}
                  placeholderTextColor={'#828282'}
                  onChangeText={(name) => { this.setState({ name })}}></TextInput>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Genre: </Text>
                <Picker 
                  style={styles.pickerInput}
                  //selectedValue={}
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
                  //selectedValue={}
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
                  //selectedValue={}
                  onValueChange={(year)=>{this.setState({year:year})}}
                >
                  {yearRange.map(item=>{return <Picker.Item label={item} value={item} />})}
                </Picker>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Condition: </Text>
                <Picker 
                  style={styles.pickerInput}
                  //selectedValue={}
                  onValueChange={(language)=>{this.setState({language:language})}}
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
                  //value={} 
                  placeholder={'Any additional comment?'}
                  placeholderTextColor={'#828282'}
                  onChangeText={(description) => { this.setState({ description })}}></TextInput>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.green}
                onPress={()=>{
                  //edit book
                this.props.navigation.goBack()
                this.props.navigation.getParam('thisProps').navigation.goBack()
              }}
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