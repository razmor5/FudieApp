import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../../Dimensions';
import FoodInput from './FoodInput';
import TimeInput from './TimeInput';
// import { useSpring, animated } from 'react-spring/native';



const AddForm = (props) => {

  const [mealName, setMealName] = useState("")
  const [time, setTime] = useState("Choose Time")
  const acceptHandler = () => {
    // if (mealName === "") {
    //   setNameFilled(!nameFilled)
    // }
    // console.log("animation")
    const meal = {
      name: mealName,
      checked: false,
      time: time,
      cal: 0
    }
    // console.log(meal)
    // console.log(props.save)
    props.save(meal)
    props.done()
  }
  return (
    <View style={styles.container}>
      <FoodInput
        labelValue={mealName}
        onChangeText={(input) => setMealName(input)}
        placeholderText="Meal Name"
      />
      <TimeInput
        timer={time}
        onChange={(input) => setTime(input)}
      />


      <View style={styles.container2}>

        <TouchableOpacity onPress={acceptHandler}>
          <AntDesign style={styles.plus} name="check" size={25} color="rgba(255, 255, 255, 0.9)" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { props.done() }}>
          <AntDesign style={styles.plus} name="close" size={25} color="rgba(255, 255, 255, 0.9)" />
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    // flex: 1,
    // display: 'flex',
    // flexDirection: "column",
    // flexDirection: "row",
    // justifyContent: 'center',
    // alignItems: 'center',
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
  container2: {
    // backgroundColor: 'rgba(50, 50, 50, 0.9)',
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    marginTop: windowHeight / 7,

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
  plus: {
    flex: 3,
    // borderWidth: 1,
    // borderColor: 'black',
    borderRadius: 100,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 3,
    // borderStyle: 'dotted',
    padding: 1,
    paddingLeft: 6,
    paddingTop: 6,
    marginTop: 15,
  },

})

export default AddForm
