import React from 'react';
import { createAppContainer } from 'react-navigation';
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

const HomeDrawer=createBottomTabNavigator(
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
        if (routeName==='Trade') iconName = 'shopping-outline';
        if (routeName==='Home') iconName ='home-outline';
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