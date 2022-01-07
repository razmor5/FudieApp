import React, { useState, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Meal from './Meal'

const Meals = (props) => {
  // const [edit, setEdit] = useState(true)

  // useLayoutEffect(() => {
  //   props.navigator.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity onPress={() => { console.log("jhghj") }}>
  //         <Text style={styles.text}>Edit</Text>
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [props.navigator]);


  return (
    <View>
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
        />
      )
      )}
      {/* <Text></Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#6179ff',
    fontWeight: 'bold',
    fontSize: 16,
  }
})

export default Meals
