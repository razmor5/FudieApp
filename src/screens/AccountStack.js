import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Account from './Account';

const AccountNavigator = createNativeStackNavigator()

const AccountStack = () => {
  return (
    <NavigationContainer independent={true}>
      <AccountNavigator.Navigator
        initialRouteName="Account" >
        <AccountNavigator.Screen
          options={{
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
            },
            headerTitleAlign: 'center'


          }}
          name="Account" component={Account} />
      </AccountNavigator.Navigator>
    </NavigationContainer>
  )
}

export default AccountStack
