/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component ,Fragment} from 'react';
import {
  
  StyleSheet,
  ScrollView, Dimensions,
  View,
  Text, ActivityIndicator,
  StatusBar, Image,
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator} from 'react-navigation-drawer'
import { createStackNavigator} from 'react-navigation-stack'
import { createAppContainer} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import SignUp from './SignUp'
import SignIn from './SignIn'
import Title from './Title'
import Games from './Games'
import Friends from './Friends'


const { width, height } = Dimensions.get('window');

global.domain = 'http://190.162.2.76/'



const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
      <Image
        style={styles.image}
        source={{
          uri: 'https://appjs.co/wp-content/uploads/2015/09/brent3-458x458.png',
        }}
      />
    </SafeAreaView>
  </ScrollView>
);

const Navigator = createBottomTabNavigator(
  {
    Games: {screen: Games, 
      navigationOptions:
      {
        tabBarIcon : ({focused}) =>  {
          
          return <Icon name='gamepad' size={20} color='white'/>
        }
      }
    },
    Friends: {screen: Friends,
    navigationOptions:
    {
      tabBarIcon : () =>  {return <Icon name='users' size={20} color='white'/>}
    }
    }
    //Maps: {screen: Maps},
    //LogOut: {screen: LogOut}
  },
  
  {
    navigationOptions:  ({ navigation }) =>  ({
      headerTitleStyle: { textAlign:"center",  },
      headerTitle: <Title />,
      headerStyle: {backgroundColor: '#FFC466'},
      headerTintColor: 'white'
    }),
    drawerPosition: 'right',
    initialRouteName: 'Friends',
    tabBarOptions:{
      activeBackgroundColor: 'brown',
      inactiveTintColor: 'gray',
      activeTintColor: 'white',
      inactiveTintColor: 'gray'
    },
  }
);

const LoginStack = createStackNavigator({
  loginScreen: { screen: SignIn },
  signupScreen: { screen: SignUp },
  },
  {
  headerMode: 'none',
  navigationOptions: {
    headerStyle: {backgroundColor: 'red'},
    title: 'You are not logged in'
  }
})

const LogedStack = createStackNavigator({
  Navigator: { screen: Navigator }
}, {
  headerMode: 'float',
  headerLayoutPreset: 'center'
})

const AppStack = createStackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: LogedStack }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack'
})


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: height,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

 const iconMap = {
   games: <Icon name='gamepad' size={20} color='white'/>,
   friends: <Icon name='users' size={20} color='white'/>
 }

const App = createAppContainer(AppStack);
export default App