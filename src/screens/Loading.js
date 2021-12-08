import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import LottieView from 'lottie-react-native';
import { windowHeight, windowWidth } from '../../Dimensions';


const Loading = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/loading.json')}
        autoPlay
        loop
      />
      <Text style={styles.title}>Fudie</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    // flex: ,
    fontSize: 48,
    marginTop: -windowHeight / 2,
  }
})

export default Loading
