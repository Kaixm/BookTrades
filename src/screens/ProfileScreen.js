import React,{Component} from "react";
import { Text, StyleSheet, Image, View, ScrollView, TouchableOpacity, FlatList, TouchableHighlight, Alert, SectionList, Modal } from "react-native";
import { StackActions,NavigationActions } from "react-navigation";

//import components
import AppHeader from "../components/AppHeader";

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//prevent LOGIN back to PROFILE once back button pressed
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});
//test data
const tradeData=[
  {
    id:"1",
    gender: "Male",
    email: "kaizhe00@gmail.com",
    phonenum: "0123456789",
    rate: "5",
  },
];

export default class ProfileScreen extends Component<Props>{


  render(){
    return(
      <View style={styles.container}>
        <AppHeader thisProps={this.props}></AppHeader>
        <View style={styles.headerContent}>
        <Image style={styles.avatar}
                  source={{uri: 'https://media-exp1.licdn.com/dms/image/C5603AQER0BY9Q4pZsA/profile-displayphoto-shrink_200_200/0/1620798677815?e=1629936000&v=beta&t=T2ilRU6cQfLClkdGYnEGfb2Q8GV1kjBnBrje6yIVMMs'}}/>
                <Text style={styles.name}>Lim Kai Zhe
                </Text>
        </View>

        <ScrollView>
        <View style={styles.item}>
        
        <View style={styles.actions}>

          <View style={styles.menuBox}>
            <Image style={styles.icon} source={{uri: 'https://thumbs.dreamstime.com/b/id-card-icon-vector-identity-tag-vector-illustration-symbol-driver-licence-logo-id-card-icon-vector-identity-tag-vector-152536266.jpg'}}/>
            <Text style={styles.info}>ID</Text>
          </View>
            <Text style={styles.text}>1</Text>
          </View>

          <View style={styles.menuBox}>
            <Image style={styles.icon} source={{uri: 'https://cdn2.vectorstock.com/i/1000x1000/70/26/man-woman-icon-gender-icon-vector-29447026.jpg'}}/>
            <Text style={styles.info}>Gender</Text>
          </View>
          <Text style={styles.text}>Male</Text>

          <View style={styles.menuBox}>
            <Image style={styles.icon} source={{uri: 'https://www.nicepng.com/png/detail/518-5185628_email-icon-symbol-of-email-black.png'}}/>
            <Text style={styles.info}>Email</Text>
          </View>
          <Text style={styles.text}>kaizhe00@gmail.com</Text>

          <View style={styles.menuBox}>
            <Image style={styles.icon} source={{uri: 'https://static.vecteezy.com/system/resources/previews/002/323/608/original/phone-icon-flat-style-isolated-on-white-background-free-vector.jpg'}}/>
            <Text style={styles.info}>Phone Number</Text>
          </View>
          <Text style={styles.text}>012-3456789</Text>

          <View style={styles.menuBox}>
            <Image style={styles.icon} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5j7T5CUC3VxhI9Nl6UyR9A4ddJ_yDIx2LQ&usqp=CAU'}}/>
            <Text style={styles.info}>Rate</Text>
          </View>
          <Text style={styles.text}>5</Text>
        </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerContent:{
    padding:20,
    alignItems: 'center',
    backgroundColor: "#AC94F4",
    borderRadius:5,
    marginBottom: 10,
  },
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#212121',
    color: '#FAFAFA'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    color: "#FAFAFA",
    fontSize: 20,
  },
  menuBox:{
    backgroundColor: "#FAFAFA",
    width: '90%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin:12,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
    borderRadius:5,
  },
  icon: {
    width:30,
    height:30,
    marginTop: 15,
  },
  item:{
    flexDirection: 'column',
    padding:10,
    marginTop: 5,
    marginRight: 10,
    justifyContent: 'space-between',
    width: '100%', 
    alignContent: 'stretch',
  },
  text:{
    backgroundColor: "#424242",
    width: '90%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
    borderRadius:5,
    fontSize: 18,
    textAlign: 'center',
    color: "#AC94F4"
  },
  info:{
    padding: 5,
  }
});
