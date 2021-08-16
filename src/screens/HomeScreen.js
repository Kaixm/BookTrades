import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, TextInput} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {Picker} from '@react-native-picker/picker';

//import components
import AppHeader from '../components/AppHeader';

export default class HomeScreen extends Component<Props> {
  constructor(props) {
    super(props);

    this.title = '';
    this.language = 'all';
    this.genre = 'all';
  }

  render() {
    return (
      <View style={styles.container}>
        <AppHeader></AppHeader>
        <TextInput
          style={styles.input}
          placeholder="Search for a Title Here!"
          placeholderTextColor="#FAFAFA"
        />
        <View style={styles.filterContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.filter}
              dropdownIconColor="#FAFAFA"
              mode="dropdown">
              <Picker.Item label="All Languages" value="all" />
              <Picker.Item label="English" value="english" />
              <Picker.Item label="Chinese" value="chinese" />
              <Picker.Item label="Malay" value="malay" />
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.filter}
              dropdownIconColor="#FAFAFA"
              mode="dropdown">
              <Picker.Item label="All Genre" value="all" />
              <Picker.Item label="Action" value="fantasy" />
              <Picker.Item label="Mystery" value="all" />
              <Picker.Item label="Horror" value="fantasy" />
              <Picker.Item label="Romance" value="all" />
              <Picker.Item label="Thrillers" value="fantasy" />
            </Picker>
          </View>
        </View>
        <ScrollView>
          <Text style={styles.headerText}>
            Recommended Books {/*Change to result on text input*/}
          </Text>
          {/* Book Container List */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#212121',
  },
  input: {
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    color: '#FAFAFA',
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
    backgroundColor: '#424242',
  },
  headerText: {
    margin: 10,
    color: '#FAFAFA',
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
  },
  filterContainer: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    width: '50%',
    borderColor: '#212121',
    borderBottomColor: '#AC94F4',
    borderWidth: 2,
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5,
  },
  filter: {
    color: '#FAFAFA',
  },
});
