import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';


//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import components
import AppHeader from "../components/AppHeader";


type Props = {};
export default class EditBookScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Edit: ' + navigation.getParam('headerTitle')
    };
  };

  constructor(props) {
    super(props)

    this.state = {
        /*id:this.props.navigation.getParam('id'),
        owner:this.props.navigation.getParam('owner'),
        name:'',
        genre:'',
        language:'',
        year:'',
        condition: '',
        description:'',*/
        id: "00001",
        gender: "Male",
        owner: "Lim Kai Zhe",
        name: "You are my glory",
        genre: "Romance",
        language: "Chinese",
        year: "2017",
        condition: "9/10",
        description: "nice story",
        fromHomeScreen:true,
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
    let repoData = this.state.repoData;

    return (
    <View style={styles.container}>
    <AppHeader thisProps={this.props}></AppHeader>
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
                <TextInput style={styles.text} editable={true} value={this.state.name}
                 onChangeText={(name) => { this.setState({ name })}}></TextInput>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Genre: </Text>
                <TextInput style={styles.text} editable={true}>{this.state.genre}</TextInput>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Language: </Text>
                <TextInput style={styles.text} editable={true}>{this.state.language}</TextInput>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Year: </Text>
                <TextInput style={styles.text} editable={true}>{this.state.year}</TextInput>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Condition: </Text>
                <TextInput style={styles.text} editable={true}>{this.state.condition}</TextInput>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Description: </Text>
                <TextInput style={styles.description} editable={true} multiline={true}>{this.state.description}</TextInput>
            </View>
        </View>
        {this.state.fromHomeScreen
          ?(
            <View style={styles.actions}>
                    <TouchableOpacity style={styles.green}
                    //onPress = 
                    >
                <Text style={styles.actionText}>Update Book</Text>
              </TouchableOpacity>      
            </View>
          )
        : null}
          
        {this.state.fromHomeScreen
          ?(
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.red}
                onPress={()=>{
                  //this._delete();
                }}
              >
                <Text style={styles.actionText}>Delete Book</Text>
              </TouchableOpacity>      
            </View>
          )
          :null}
        </ScrollView>
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