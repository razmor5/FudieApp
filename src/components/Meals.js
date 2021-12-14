import React from 'react'
import { View, Text } from 'react-native'
import Meal from './Meal'

const Meals = (props) => {
  return (
    <View>
      {props.meals.map(meal =>
      (
        <Meal key={meal.id} meal={meal}
          onFetch={props.onFetch}
          day={props.day}
          onToggle={props.onToggle}
          navigator={props.navigator}
        />
      )
      )}
      {/* <Text></Text> */}
    </View>
  )
}

export default Meals
