import React,{Component} from "react";
import { Text, StyleSheet, View, ScrollView, FlatList, TouchableHighlight } from "react-native";
import { FloatingAction } from 'react-native-floating-action';

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import components
import AppHeader from "../components/AppHeader";
import BookContainer from "../components/BookContainer";

const actions = [{
  text: 'Add',
  //icon: require('../Icons/create.png'),
  name: 'add',
  position: 1,
}];

const repoData = [
  {
    id: "00001",
      gender: "Male",
      owner: "Lim Kai Zhe",
      name: "You are my glory",
      genre: "Romance",
      language: "Chinese",
      year: "2017",
      condition: "9/10",
      description: "nice story",
  },
  {
    id: "00002",
      gender: "Male",
      owner: "Lim Kai Zhe",
      name: "You are my glory2",
      genre: "Romance",
      language: "Chinese",
      year: "2019",
      condition: "9/10",
      description: "nice story",
  }
]

type Props = {};
export default class RepositoryScreen extends Component<Props>{
  constructor(props) {
    super(props)

    this.state = {
    };

  }


  render() {
    return (
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
        <FlatList
          data={repoData}
          extraData={this.state}
          renderItem={({item})=>{
            return (
              <BookContainer
                id={item.id}
                gender={item.gender}
                owner={item.owner}
                name={item.name}
                genre={item.genre}
                language={item.language}
                year={item.year}
                condition={item.condition}
                description={item.description}
                thisProps={this.props} 
                ></BookContainer>
              )
            }}
        ></FlatList>
        <FloatingAction
          actions={actions}
          overrideWithAction={true}
          color={'#AC94F4'}
          onPressItem={
            () => {
              this.props.navigation.navigate('AddBook', {
                //refresh: this._query,
              })
            }
          }
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#212121',
  },
});
