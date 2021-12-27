import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SocialScreen from './SocialScreen';

const SocialNavigator = createNativeStackNavigator()

const SocialStack = () => {
  return (
    <NavigationContainer independent={true}>
      <SocialNavigator.Navigator
        initialRouteName="Social" >
        <SocialNavigator.Screen
          options={{
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
            },
            headerRight: () => { <TouchableOpacity>Add</TouchableOpacity> }

          }}
          name="Social" component={SocialScreen} />
      </SocialNavigator.Navigator>
    </NavigationContainer>
  )
}

export default SocialStack
