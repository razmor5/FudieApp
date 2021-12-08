import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import DayScreen from './DayScreen';
import MealScreen from './MealScreen';

const HomeNavigator = createNativeStackNavigator()

const HomeStack = () => {
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
