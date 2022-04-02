import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import DayScreen from './DayScreen';
import MealScreen from './MealScreen';
import * as Notifications from 'expo-notifications';
import storage from "@react-native-async-storage/async-storage";


const HomeNavigator = createNativeStackNavigator()

const HomeStack = () => {


  const getPermission = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Enable push notifications to use the app!');
        await storage.setItem('expopushtoken', "");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      await storage.setItem('expopushtoken', token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }

  useEffect(() => {
    getPermission()
  }, [])



  return (

    <NavigationContainer independent={true}>
      <HomeNavigator.Navigator
        initialRouteName="Weakly Diary" >
        <HomeNavigator.Screen
          options={{
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
            },
            headerTitleStyle: {
              // color: 'white',
            },

          }}
          name="Weakly Diary" component={Home} />
        <HomeNavigator.Screen
          options={{
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
            },
          }}
          name="Daily routine" component={DayScreen} />
        <HomeNavigator.Screen
          options={{
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
            },
          }}
          name="Meal" component={MealScreen} />
      </HomeNavigator.Navigator>
    </NavigationContainer>

    // <Home />
  )
}

export default HomeStack
