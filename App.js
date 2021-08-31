import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import all screens
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import TradeScreen from './src/screens/TradeScreen';
import TradeDetailsScreen from './src/screens/TradeDetailsScreen';
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import StartTradeScreen from './src/screens/StartTradeScreen';
import AddBookScreen from './src/screens/AddBookScreen';
import EditBookScreen from './src/screens/EditBookScreen';
import ViewProfileScreen from './src/screens/ViewProfileScreen';
import { Alert, TouchableOpacity } from 'react-native';

const TradeStack=createStackNavigator(
  {
    Trade: TradeScreen,
    TradeDetails: TradeDetailsScreen,
    BookDetails: BookDetailsScreen,
    ViewProfile: ViewProfileScreen,
  },
  {
    headerMode:'none',
    initialRouteName:'Trade',
  }
)

const HomeStack=createStackNavigator(
  {
    Home: HomeScreen,
    BookDetails: BookDetailsScreen,
    StartTrade: StartTradeScreen,
    ViewProfile: ViewProfileScreen,
  },
  {
    headerMode:'none',
    initialRouteName:'Home',
  }
)

const ProfileStack=createStackNavigator(
  {
    Profile: ProfileScreen,
    BookDetails: BookDetailsScreen,
    AddBook: AddBookScreen,
    EditBook: EditBookScreen,
  },
  {
    headerMode:'none',
    initialRouteName:'Profile',
  }
)

const LoginStack=createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    headerMode:'null',
    initialRouteName:'Login',
  }
)

const HomeTab=createBottomTabNavigator(
  {
    Trade: TradeStack,
    Home: HomeStack,
    Profile: ProfileStack,
  },
  {
    initialRouteName:'Home',
    backBehavior:'none',
    order:['Trade','Home','Profile'],
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let screenName;
        if (routeName==='Trade') {iconName = 'shopping-outline',screenName='Trade'};
        if (routeName==='Home') {iconName ='home-outline',screenName='Home'};
        if (routeName==='Profile') {iconName = 'clipboard-account-outline',screenName='Profile'};
        return <MaterialCommunityIcons name={iconName} size={25} color={tintColor}/>;
      },
    }),
    tabBarOptions: {
      showLabel:true,
      labelStyle:{
        fontFamily:'Quicksand-Bold',
        fontSize:13,
      },
      activeTintColor: '#AC94F4',
      inactiveTintColor: '#FAFAFA',
      style:{
        borderTopWidth:1,
        borderTopColor:'#424242',
        backgroundColor:'#212121',
        height:60,
        paddingTop:5,
        paddingBottom:5,
      },
    },
  }
)

const AppStack=createSwitchNavigator(
  {
    LoginStack: LoginStack,
    HomeTab: HomeTab,
  },
  {
    headerMode:'none',
    initialRouteName:'LoginStack',
  }
)

export default createAppContainer(AppStack);