import React from 'react'
import { View, Text } from 'react-native'
import Calculator from '../components/Calculator'

const MealScreen = (props) => {
  const onPlusHandler = (input) => {
    console.log("add the food to the meal", input)
  }
  return (
    <Calculator onPlusHandler={onPlusHandler} showPlus={true} />
  )
}

export default MealScreen
