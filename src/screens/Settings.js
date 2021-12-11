import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import firebase from 'firebase';
import "firebase/firestore";
import Loading from './Loading';

const Settings = () => {
  // const customData = require('../../relevantdb.json');
  // const res = customData.json()
  const [load, setLoad] = useState(false)
  const [db, setDb] = useState([])
  // const fetchData = async () => {
  //   let data = []
  //   await firebase.firestore().collection("fudieDB").get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         data.push({
  //           id: doc.id,
  //           code: doc.data().code,
  //           name: doc.data().name,
  //           calories: doc.data().calories,
  //           protein: doc.data().protein,
  //           carbohydrates: doc.data().carbohydrates,
  //           fats: doc.data().fats,
  //           total_sugars: doc.data().total_sugars,
  //           cholesterol: doc.data().cholesterol,
  //           sodium: doc.data().sodium,
  //           dietary_fiber: doc.data().dietary_fiber,
  //           iron: doc.data().iron,
  //           calcium: doc.data().calcium
  //         })
  //       })
  //     })
  //   return data
  // }

  const fetchData = async () => {
    const data = await require('../../relevantdb.json');
    return data
  }

  useEffect(() => {
    const getData = async () => {
      const dataFromServer = await fetchData()
      setDb(dataFromServer)
      setLoad(true)
    }
    getData()
  }, [])

  if (!load) {
    return (
      <Loading />
    )
  }

  return (
    <ScrollView>

      {/* {db.map(item => <Text>{item.name}</Text>)} */}
      {db.map(item => <Text key={item.id}>{item.name}</Text>)}
    </ScrollView>
  )
}

export default Settings
