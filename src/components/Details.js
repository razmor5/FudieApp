import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Picker } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions';
import FoodInput from './FoodInput'
import Plus from './Plus';



const Details = (props) => {
  console.log(props.showDetails)
  const [amount, setAmount] = useState("")
  const onChangeTextHandler = (input) => {
    setAmount(input)
    console.log(amount)
  }
  const onPlusPressHandler = () => {
    setAmount("")
    props.onPlusHandler("hello")
  }
  return (
    <View style={styles.container}>
      <FoodInput
        iconType="check"
        labelValue={amount}
        onChangeText={(input) => {
          onChangeTextHandler(input)
        }}
        placeholderText="Amount(gm)"
        keyboardType='number-pad' />
      <Text style={styles.text}>{props.foodItem.name}</Text>
      {(amount != 0 && !isNaN(amount) && props.showDetails) && <View>
        <Text style={styles.text}>calories: {Math.round(props.foodItem.calories * parseInt(amount) / 100)}</Text>
        <Text style={styles.text}>protein: {Math.round(props.foodItem.protein * parseInt(amount) / 100)}</Text>
        <Text style={styles.text}>fat: {Math.round(props.foodItem.fats * parseInt(amount) / 100)}</Text>
        <Text style={styles.text}>carbs: {Math.round(props.foodItem.carbohydrates * parseInt(amount) / 100)}</Text>
        <View style={styles.container1}>

          {props.showPlus && <Plus onPlus={onPlusPressHandler} />}
        </View>
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: windowHeight / 40,
    width: '100%',
    // minHeight: windowHeight / 3,
    // maxHeight: windowHeight / 4,
    backgroundColor: 'green',
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    padding: 10,
  },
  container1: {
    // backgroundColor: 'rgba(227, 221, 201, 1)',
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: 'center',
    alignItems: 'center',
    // marginTop: windowHeight / 9,
    // marginBottom: windowHeight / 9,
  },
  text: {

    fontSize: 16,
  },
  picker: {
    // flex: 1,
    backgroundColor: '#fafafa',
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    borderColor: 'red',
    borderWidth: 1,
    // justifyContent: 'center',
  },
})

export default Details
