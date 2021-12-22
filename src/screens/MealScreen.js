import React from 'react'
import { View, Text } from 'react-native'
import Calculator from '../components/Calculator'
import firebase from 'firebase';
import "firebase/firestore";

const MealScreen = (props) => {
  const onPlusHandler = (input) => {
    const db = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection(props.route.params.day).doc(props.route.params.meal.id);
    db.get().then((doc) => {
      db.collection("FoodItems")
        .add({
          amount: parseInt(input.amount),
          id: input.item.id,
          code: input.item.code,
          name: input.item.name,
          calories: input.item.calories * (parseInt(input.amount) / 100),
          protein: input.item.protein * (parseInt(input.amount) / 100),
          carbohydrates: input.item.carbohydrates * (parseInt(input.amount) / 100),
          fats: input.item.fats * (parseInt(input.amount) / 100),
          total_sugars: input.item.total_sugars * (parseInt(input.amount) / 100),
          cholesterol: input.item.cholesterol * (parseInt(input.amount) / 100),
          sodium: input.item.sodium * (parseInt(input.amount) / 100),
          dietary_fiber: input.item.dietary_fiber * (parseInt(input.amount) / 100),
          iron: input.item.iron * (parseInt(input.amount) / 100),
          calcium: input.item.calcium * (parseInt(input.amount) / 100),
        })
      db.set({
        cal: doc.data().cal + input.item.calories * (parseInt(input.amount) / 100)
      }, { merge: true })
      props.route.params.onFetch()
      props.navigation.pop()
    })

  }
  return (
    <Calculator day={props.route.params.day} meal={props.route.params.meal} onPlusHandler={onPlusHandler} showPlus={true} />
  )
}

export default MealScreen
