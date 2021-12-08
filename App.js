import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, I18nManager } from "react-native";
// import { createStackNavigator } from '@react-navigation/stack';

import firebase from 'firebase';
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import ForgotPassword from "./src/screens/ForgotPassword";
import BG from './assets/login_bg.jpg'
import HomeStack from "./src/screens/HomeStack";
import Calculator from './src/screens/Calculator';
import Settings from './src/screens/Settings';
import LottieView from 'lottie-react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DayScreen from './src/screens/DayScreen';
import Loading from './src/screens/Loading';
import MealScreen from './src/screens/MealScreen';


// import firebase, { initializeApp } from 'firebase/app';

// import * as firebase from 'firebase';

I18nManager.forceRTL(false)
I18nManager.allowRTL(false)
const firebaseConfig = {
  apiKey: "AIzaSyC67uJORnmt1MBOer8dUtDLn6VkSEYp6hU",
  authDomain: "fudie-facf9.firebaseapp.com",
  projectId: "fudie-facf9",
  storageBucket: "fudie-facf9.appspot.com",
  messagingSenderId: "74879109553",
  appId: "1:74879109553:web:e76abe5b01512edfec5590",
  measurementId: "G-YN8S0RJ2TK"
};
// const app = initializeApp(firebaseConfig)

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// console.log(app)

const AppStack = createNativeStackNavigator()
const AppTab = createMaterialBottomTabNavigator()
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("notLoaded")

  useEffect(() => {
    setTimeout(() => {

      firebase.auth().onAuthStateChanged((user) => {
        !user ? setIsLoggedIn(false) : setIsLoggedIn(true)

      });
    }, 1000)
  }, [])
  if (isLoggedIn === "notLoaded") {
    return (
      <Loading />
    )
  }
  if (!isLoggedIn) {
    return (

      <NavigationContainer>
        <AppStack.Navigator initialRouteName="Login" screenOptions={{
          headerShown: false
        }}>
          <AppStack.Screen name="Login" component={Login} />
          <AppStack.Screen name="Register" component={Register} />
          <AppStack.Screen name="ForgotPassword" component={ForgotPassword} />

        </AppStack.Navigator>

      </NavigationContainer>
    )
  }
  return (

    <NavigationContainer >
      <AppTab.Navigator
        activeColor="black"
        barStyle={styles.bottom}
        initialRouteName="Home"
        headerMode='none'>
        <AppTab.Screen name="Home" component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={23} />
            ),
          }}
        />
        <AppTab.Screen name="Calculator" component={MealScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calculator" color={color} size={23} />
            ),
          }}
        />
        <AppTab.Screen name="Settings" component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-cog-outline" color={color} size={23} />
            ),
          }}
        />
        <AppTab.Screen name="Log Out" component={HomeStack}
          listeners={({ navigation }) => ({
            tabPress: event => {
              event.preventDefault();
              firebase.auth().signOut()
            }
          })
          }
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="logout" color={color} size={23} />
            ),
          }}
        />

      </AppTab.Navigator>


    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e3d3c8',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {

  },
  bottom: {
    backgroundColor: 'rgba(240, 240, 240, 0.7)',

  },
});

export default App;
