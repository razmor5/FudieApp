import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions';
import Plus from './Plus';
import firebase from 'firebase';
import "firebase/firestore";

const Meal = (props) => {

  const onLongPressHandler = () => {
    props.forceEditPressDone()
    props.navigator.navigate("Meal", {
      meal: props.meal,
      showPlus: true,
      day: props.day,
      onFetch: props.onFetch,
      onAdd: props.onAdd
    })
  }

  const onSureDelete = () => {
    props.onDeleteMeal(props.meal.id)
    // console.log(props.meal.id)
    // console.log(props.day)
  }

  const onPressDeleteHandler = () => {
    Alert.alert('', 'Are you sure?', [
      { text: 'Cancel', onPress: () => { console.log("canceled") } },
      { text: 'Delete', onPress: onSureDelete },
    ])
  }

  return (
    <View
      style={styles.mainContainer}
    >
      {!props.edit &&
        <TouchableOpacity onPress={onPressDeleteHandler}
          style={styles.delete}>
          <Plus name="delete" onPlus={onPressDeleteHandler} />
        </TouchableOpacity>
      }

      <TouchableOpacity
        style={
          {
            backgroundColor: props.meal.checked ? 'rgba(250, 250, 250, 0.9)' : 'rgba(50, 50, 50, 0.9)',
            flex: 1,
            flexDirection: "row",
            alignItems: 'center',
            borderTopRightRadius: 10,
            borderTopLeftRadius: props.edit ? 10 : 0,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: props.edit ? 10 : 0,
            maxWidth: windowWidth - 20,
            minHeight: windowHeight / 7,
            maxHeight: windowHeight / 7,

          }
        }
        onLongPress={onLongPressHandler}
        onPress={() => props.onToggle(props.meal.id, props.meal.checked)}>

        <Text style={props.meal.checked ? styles.checkedItem : styles.item}>{props.meal.name}</Text>
        {/* <Text style={props.meal.checked ? checkedItem : item}>{props.meal.name}</Text> */}

        {/* {<Text style={props.meal.checked ? styles.checkedItem2 : styles.item2}>remaining: 1587</Text>} */}

        <View style={styles.sub}>
          <Text style={props.meal.checked ? styles.checkedTime : styles.time}>{props.meal.time}</Text>
          <Text style={props.meal.checked ? styles.checkedItem2 : styles.item2}>cal: {Math.round(props.meal.cal)}</Text>
        </View>
      </TouchableOpacity>
    </View >
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'flex-start',
    flex: 1,
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    minWidth: windowWidth - 20,
    maxWidth: windowWidth - 20,
  },
  container: {
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 0,
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: windowWidth - 20,
    minHeight: windowHeight / 7,
    maxHeight: windowHeight / 7,
  },
  checkedContainer: {
    backgroundColor: 'rgba(250, 250, 250, 0.9)',
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 0,
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: windowWidth - 20,
    minHeight: windowHeight / 7,
    maxHeight: windowHeight / 7,
  },
  item: {
    maxWidth: windowWidth / 1.7,
    maxHeight: windowHeight / 7,
    flex: 2,
    fontSize: 25,
    marginRight: 10,
    position: 'absolute',
    left: 20,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  checkedItem: {
    maxWidth: windowWidth / 1.7,
    maxHeight: windowHeight / 7,
    flex: 2,
    fontSize: 25,
    marginRight: 10,
    position: 'absolute',
    left: 20,
    color: 'rgba(50, 50, 50, 0.9)',
  },

  item2: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  checkedItem2: {
    flex: 1,
    color: 'rgba(50, 50, 50, 0.9)',
  },
  time: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  checkedTime: {
    fontSize: 20,
    color: 'rgba(50, 50, 50, 0.9)',
  },
  sub: {
    position: 'absolute',
    right: 20,
  },
  delete: {
    backgroundColor: 'rgba(150, 50, 50, 0.9)',
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 10,
    maxWidth: windowWidth / 6,
    minHeight: windowHeight / 7,
    maxHeight: windowHeight / 7,
  }

})

export default Meal
