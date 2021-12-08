import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions';


const Meal = (props) => {

  const onLongPressHandler = () => {
    props.navigator.navigate("Meal")
  }

  return (

    <TouchableOpacity
      style={props.meal.checked ? styles.checkedContainer : styles.container}
      onLongPress={onLongPressHandler}
      onPress={() => props.onToggle(props.meal.id, props.meal.checked)}>


      <Text style={props.meal.checked ? styles.checkedItem : styles.item}>{props.meal.name}</Text>

      {/* {<Text style={props.meal.checked ? styles.checkedItem2 : styles.item2}>remaining: 1587</Text>} */}

      <View style={styles.sub}>
        <Text style={props.meal.checked ? styles.checkedTime : styles.time}>{props.meal.time}</Text>
        <Text style={props.meal.checked ? styles.checkedItem2 : styles.item2}>cal: {props.meal.cal}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
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
  checkedContainer: {
    backgroundColor: 'rgba(250, 250, 250, 0.9)',
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
  },
  time: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  checkedTime: {
    fontSize: 20,
    color: 'rgba(50, 50, 50, 0.9)',
  },
  checkedItem: {
    flex: 2,
    fontSize: 30,
    color: 'rgba(50, 50, 50, 0.9)',
  },
  checkedItem2: {
    flex: 1,
    color: 'rgba(50, 50, 50, 0.9)',
  },
  sub: {
    alignItems: 'flex-start',
    // justifyContent: 'center',
    // flex: 0.5,
    flexDirection: "column",

  }

})

export default Meal
