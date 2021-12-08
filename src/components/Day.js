import React, { useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions';



const Day = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        delay: props.delay,
        useNativeDriver: true,
      }
    ).start();
  }, [])

  // console.log(props.date)
  const dayName = props.date.toString().split(' ');
  const onPressHandler = () => {
    props.navigateTo.navigation.navigate('Daily routine', { bg: props.bg, dayName: dayName[0], date: props.date, navigator: props.navigateTo.navigation })
  }
  // console.log(dayName[2])
  // console.log(props.date.getUTCDate(), props.date.getUTCMonth() + 1, props.date.getUTCFullYear(), dayName)
  return (

    <TouchableOpacity blurRadius={10} style={styles.container} onPress={onPressHandler}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          backgroundColor: 'rgba(50, 50, 50, 0.9)',
          flex: 1,
          // display: 'flex',
          flexDirection: "row",
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          borderRadius: 10,
          // borderColor: 'rgba(50, 50, 50, 0.7)',
          // borderWidth: 1,
          marginTop: 10,
          color: 'rgba(255, 255, 255, 0.9)',
          minWidth: windowWidth - 20,
          maxWidth: windowWidth - 20,
          minHeight: windowHeight / 7,
        }}>
        <Text style={styles.item}>{dayName[0]}</Text>

        <Text style={styles.item2}>{dayName[1]} {props.date.getUTCDate()} {props.date.getUTCFullYear()}</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(50, 50, 50, 0.9)',
    flex: 1,
    // display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
    borderRadius: 10,
    // borderColor: 'rgba(50, 50, 50, 0.7)',
    // borderWidth: 1,
    // marginTop: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    minWidth: windowWidth - 20,
    maxWidth: windowWidth - 20,
    // minHeight: windowHeight / 7,
    // opacity: fadeAnim,
  },
  container2: {
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    flex: 1,
    // display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    // borderColor: 'rgba(50, 50, 50, 0.7)',
    // borderWidth: 1,
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    minWidth: windowWidth - 20,
    maxWidth: windowWidth - 20,
    minHeight: windowHeight / 7,
  },
  item: {
    flex: 2,
    fontSize: 30,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  item2: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.9)',

    // borderColor: 'rgb(0, 0, 0)',
    // borderWidth: 1,
    // borderRadius: 5,
    // maxWidth: windowWidth / 4,
    // padding: 10,
  },

})

export default Day
