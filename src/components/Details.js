import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Picker } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions';
import FoodInput from './FoodInput'
import Plus from './Plus';
import firebase from 'firebase';
import "firebase/firestore";
import ChartPie from './ChartPie';
import Nutritional from './Nutritional';




const Details = (props) => {
  // console.log(props.showDetails)
  const [amount, setAmount] = useState("")
  // const [item, setAmount] = useState("")
  const onChangeTextHandler = (input) => {
    setAmount(input)
    // console.log(amount)
  }
  const onPlusPressHandler = () => {
    props.onPlusHandler({
      item: props.foodItem,
      amount: amount
    })
    setAmount("")
  }


  // const fetchItem = async (id) => {
  //   const fetchedItem = firebase.firestore().collection("fudieDB").doc(id);
  //   return fetchedItem
  // }

  // useEffect(() => {
  //   const getData = async (id) => {
  //     const itemFromServer = await fetchItem(id)
  //     setItem(itemFromServer)
  //     console.log("item")
  //     // setLoad(true)
  //   }
  //   getData(props.foodItem.id)
  // }, [])

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

      <Text style={styles.title}>{props.foodItem.name}</Text>
      {(amount != 0 && !isNaN(amount) && props.showDetails) &&
        <Nutritional
          onlyCalc={props.onlyCalc}
          foodItem={{
            ...props.foodItem,
            calcium: Math.round(((props.foodItem.calcium * parseInt(amount) / 100) + Number.EPSILON) * 100) / 100,
            calories: Math.round(((props.foodItem.calories * parseInt(amount) / 100) + Number.EPSILON) * 100) / 100,
            carbohydrates: Math.round(((props.foodItem.carbohydrates * parseInt(amount) / 100) + Number.EPSILON) * 100) / 100,
            cholesterol: Math.round(((props.foodItem.cholesterol * parseInt(amount) / 100) + Number.EPSILON) * 100) / 100,
            dietary_fiber: Math.round(((props.foodItem.dietary_fiber * parseInt(amount) / 100) + Number.EPSILON) * 100) / 100,
            fats: Math.round(((props.foodItem.fats * parseInt(amount) / 100) + Number.EPSILON) * 100) / 100,
            iron: Math.round(((props.foodItem.iron * parseInt(amount) / 100) + Number.EPSILON) * 100) / 100,
            protein: Math.round(((props.foodItem.protein * parseInt(amount) / 100) + Number.EPSILON) * 100) / 100,
            sodium: Math.round(((props.foodItem.sodium * parseInt(amount) / 100) + Number.EPSILON) * 100) / 100,
            total_sugars: Math.round(((props.foodItem.total_sugars * parseInt(amount) / 100) + Number.EPSILON) * 100) / 100,


          }}
          showPlus={props.showPlus} onPlus={onPlusPressHandler} amount={amount} />


      }

    </View>
  )
}

const styles = StyleSheet.create({
  left: {
    flex: 1,
    marginRight: 10,
  },
  right: {
    flex: 1,
  },
  container: {
    marginTop: windowHeight / 40,
    width: '100%',
    // minHeight: windowHeight / 3,
    // maxHeight: windowHeight / 4,
    // backgroundColor: 'rgba(10, 10, 40, 0.9)',
    backgroundColor: 'rgba(150, 150, 150, 0.9)',
    // backgroundColor: 'green',
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    padding: 10,
  },
  container1: {
    alignItems: 'center',
  },
  text: {

    fontSize: 16,
    color: 'black',
    borderBottomWidth: 1,

  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }

})

export default Details
