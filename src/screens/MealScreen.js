import React from 'react'
import { View, Text } from 'react-native'
import Calculator from '../components/Calculator'
import firebase from 'firebase';
import "firebase/firestore";

const MealScreen = (props) => {
  const db = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection(props.route.params.day).doc(props.route.params.meal.id);
  let total_calories = props.route.params.meal.cal
  const onPlusHandler = (input, fetchReq) => {
    db.get().then((doc) => {
      db.collection("FoodItems")
        .add({
          amount: parseInt(input.amount),
          id: input.item.id,
          code: input.item.code,
          name: input.item.name,
          calories: Math.round(((input.item.calories * (parseInt(input.amount) / 100)) + Number.EPSILON) * 100) / 100,
          protein: Math.round(((input.item.protein * (parseInt(input.amount) / 100)) + Number.EPSILON) * 100) / 100,
          carbohydrates: Math.round(((input.item.carbohydrates * (parseInt(input.amount) / 100)) + Number.EPSILON) * 100) / 100,
          fats: Math.round(((input.item.fats * (parseInt(input.amount) / 100)) + Number.EPSILON) * 100) / 100,
          total_sugars: Math.round(((input.item.total_sugars * (parseInt(input.amount) / 100)) + Number.EPSILON) * 100) / 100,
          cholesterol: Math.round(((input.item.cholesterol * (parseInt(input.amount) / 100)) + Number.EPSILON) * 100) / 100,
          sodium: Math.round(((input.item.sodium * (parseInt(input.amount) / 100)) + Number.EPSILON) * 100) / 100,
          dietary_fiber: Math.round(((input.item.dietary_fiber * (parseInt(input.amount) / 100)) + Number.EPSILON) * 100) / 100,
          iron: Math.round(((input.item.iron * (parseInt(input.amount) / 100)) + Number.EPSILON) * 100) / 100,
          calcium: Math.round(((input.item.calcium * (parseInt(input.amount) / 100)) + Number.EPSILON) * 100) / 100,
        }).then(fetchReq)
      db.set({
        cal: doc.data().cal + input.item.calories * (parseInt(input.amount) / 100)
      }, { merge: true })

      total_calories += input.item.calories * (parseInt(input.amount) / 100)
      props.route.params.onAdd(props.route.params.meal.id, total_calories)
      // console.log(props.route.params.meal.id, input.item.calories * (parseInt(input.amount) / 100))

      // props.route.params.onFetch()
      // props.navigation.pop()
    })
  }


  const onDeleteHandler = (key, cal) => {
    db.get().then((doc) => {
      db.collection("FoodItems").doc(key).delete().then(() => {
        db.set({
          cal: doc.data().cal - cal
        }, { merge: true })
      })
      total_calories -= cal

      props.route.params.onAdd(props.route.params.meal.id, total_calories)
      // console.log(props.route.params.meal.id, -cal)
    })
  }

  return (
    <Calculator onDelete={onDeleteHandler} day={props.route.params.day} meal={props.route.params.meal} onPlusHandler={onPlusHandler} showPlus={true} />
  )
}

export default MealScreen
