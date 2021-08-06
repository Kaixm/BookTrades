/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable curly */
/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import all screens
import AboutScreen from './src/screens/AboutScreen';
import ChatScreen from './src/screens/ChatScreen';
import GuideScreen from './src/screens/GuideScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RepositoryScreen from './src/screens/RepositoryScreen';
import TradeScreen from './src/screens/TradeScreen';

const ProfileStack=createStackNavigator(
  {
    Profile: ProfileScreen,
    About: AboutScreen,
    Guide: GuideScreen,
  },
  {
    headerMode:'none',
    initialRouteName:'Profile',
  }
)

const HomeDrawer=createBottomTabNavigator(
  {
    Chat: ChatScreen,
    Home: HomeScreen,
    Profile: ProfileStack,
    Repository: RepositoryScreen,
    Trade: TradeScreen,
  },
  {
    initialRouteName:'Home',
    backBehavior:'none',
    order:['Repository','Trade','Home','Chat','Profile'],
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName==='Repository') iconName = 'store-outline';
        if (routeName==='Trade') iconName = 'shopping-outline';
        if (routeName==='Home') iconName ='home-outline';
        if (routeName==='Chat') iconName = 'message-processing-outline';
        if (routeName==='Profile') iconName = 'face-outline';
        return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel:true,
      labelStyle:{
        fontSize:13,
      },
      activeTintColor: '#FFFFFF',
      activeBackgroundColor:'#FF9292',
      inactiveTintColor: '#FF9292',
      inactiveBackgroundColor:'#FFFFFF',
    },
  }
)

const AppStack=createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Home: HomeDrawer,
  },
  {
    headerMode:'none',
    initialRouteName:'Login',
  }
)

export default createAppContainer(AppStack);