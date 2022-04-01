import React, { useState, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Meal from './Meal'
import { windowHeight, windowWidth } from '../../Dimensions';

const Meals = (props) => {

  const totalCaloriesSum = () => {
    let finalAmount = 0
    props.meals.map(({ cal }) => {
      finalAmount += cal
    })
    // console.log(finalAmount)
    return Math.round(finalAmount)
  }
  const [totalCalories, setTotalCalories] = useState(totalCaloriesSum())

  const onEditCaloriesToTotal = (amount) => {
    setTotalCalories(LastState => LastState + amount)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total Calories: {totalCalories}</Text>
      {props.meals.map(meal =>
      (
        <Meal key={meal.id} meal={meal}
          onFetch={props.onFetch}
          day={props.day}
          onToggle={props.onToggle}
          navigator={props.navigator}
          onAdd={props.onAdd}
          edit={props.edit}
          forceEditPressDone={props.forceEditPressDone}
          onDeleteMeal={props.onDeleteMeal}
          onEditCaloriesToTotal={onEditCaloriesToTotal}
        />
      )
      )}
      {/* <Text></Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // textAlign: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: windowWidth / 18,
  }
})

export default Meals
