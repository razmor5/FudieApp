import React from 'react'
import { View, Text, Image } from 'react-native'
import Log from '../../assets/logo.png'


const Logo = () => {
  return (
    <View style={{
      textAlign: 'center',
      alignSelf: 'center',
      marginTop: 128,

    }}>
      <Image source={Log} />
    </View>
  )
}

export default Logo
