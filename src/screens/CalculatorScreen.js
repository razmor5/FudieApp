import React from 'react'
import { View, Text } from 'react-native'
import Calculator from '../components/Calculator'

const CalculatorScreen = () => {
  return (
    <Calculator onlyCalc={true} showPlus={false} />
  )
}

export default CalculatorScreen
