import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import all screens
import ChatScreen from './src/screens/ChatScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RepositoryScreen from './src/screens/RepositoryScreen';
import TradeScreen from './src/screens/TradeScreen';
import TradeDetailsScreen from './src/screens/TradeDetailsScreen';
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import ReviewScreen from './src/screens/ReviewScreen';

const RepositoryStack=createStackNavigator(
  {
    Repository: RepositoryScreen,
    //add additional screens here
  },
  {
    headerMode:'none',
    initialRouteName:'Repository',
  }
)

const TradeStack=createStackNavigator(
  {
    Trade: TradeScreen,
    TradeDetails: TradeDetailsScreen,
    BookDetails: BookDetailsScreen,
    Review: ReviewScreen,
  },
  {
    headerMode:'none',
    initialRouteName:'Trade',
  }
)

const HomeStack=createStackNavigator(
  {
    Home: HomeScreen,
    //add additional screens here
  },
  {
    headerMode:'none',
    initialRouteName:'Home',
  }
)

const ChatStack=createStackNavigator(
  {
    Chat: ChatScreen,
    //add additional screens here
  },
  {
    headerMode:'none',
    initialRouteName:'Chat',
  }
)

const ProfileStack=createStackNavigator(
  {
    Profile: ProfileScreen,
    //add additional screens here
  },
  {
    headerMode:'none',
    initialRouteName:'Profile',
  }
)

const HomeDrawer=createBottomTabNavigator(
  {
    Repository: RepositoryStack,
    Trade: TradeStack,
    Home: HomeStack,
    Chat: ChatStack,
    Profile: ProfileStack,
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
        if (routeName==='Profile') iconName = 'clipboard-account-outline';
        return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;
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
      }
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