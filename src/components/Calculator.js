import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions';
import FoodInput from './FoodInput';
import Details from './Details';
import Loading from '../screens/Loading';
import firebase from 'firebase';
import "firebase/firestore";
import Card from './Card';

const Calculator = (props) => {

  const [load, setLoad] = useState(false)
  const [fetchMeals, setFetchMeals] = useState(false)
  const [db, setDb] = useState([])
  const [meals, setMeals] = useState([])
  const fetchRequest = () => {
    setFetchMeals(!fetchMeals)
  }
  const fetchData = async () => {
    const data = await require('../../relevantdb.json');
    return data
  }

  const fetchMealsReq = async () => {
    let fetchedMealItems = []
    await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection(props.day).doc(props.meal.id).collection("FoodItems").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log("doc info", doc.data())
          fetchedMealItems.push({ ...doc.data(), showValues: false })
        });
      })
      .catch((err) => {
        console.log(err.message)
      })
    return fetchedMealItems
  }

  useEffect(() => {
    const getData = async () => {
      const dataFromServer = await fetchData()
      setDb(dataFromServer)
      // setLoad(true)
    }
    const getMeals = async () => {
      const mealsFromServer = await fetchMealsReq()
      setMeals(mealsFromServer)
    }
    getMeals()
    getData()
    setLoad(true)
  }, [])


  const onPressValuesHandler = (id) => {
    // setMealsValuesShow(mealsValuesShow.map((item) => item.id === id ? { ...item, showValues: true } : { ...item, showValues: false }))
    setMeals(meals.map((item) => item.id === id ? { ...item, showValues: !item.showValues } : { ...item, showValues: false }))
  }





  const [input, setInput] = useState("");
  const [foodItem, setFoodItem] = useState({})
  const [display, setDisplay] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const onPlusPressHandler = (input) => {
    setInput("")
    setFoodItem({})
    setDisplay(false)
    setShowDetails(false)
    props.onPlusHandler(input)
  }

  const onChangeTextHandler = (input) => {
    setInput(input)
    setShowDetails(false)
    // if (input === "") {
    //   setDisplay(false)
    //   setShowDetails(false)
    // }
    // else {
    //   setDisplay(true)
    // }
  }
  const onPickOptionTextHandler = (input) => {
    setInput(input.name)
    setFoodItem(input)
    setDisplay(false)
    setShowDetails(true)
  }


  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking...')
      if (input === "") {
        setDisplay(false)
        setShowDetails(false)
      }
      else {
        if (!showDetails) {

          setDisplay(true)
        }
      }
    }, 200)

    return () => {
      console.log('CLEANUP')
      clearTimeout(identifier)
    };
  }, [input]);


  if (!load) {
    return (
      <Loading />
    )
  }

  return (
    <View style={styles.container}>
      <FoodInput
        iconType="check"
        labelValue={input}
        onChangeText={onChangeTextHandler}
        placeholderText="Search" />
      {display && <ScrollView style={styles.viewContainer}>
        {db.filter((item) => item.name.includes(input))
          .map(item => <TouchableOpacity key={item.code} onPress={() => { onPickOptionTextHandler(item) }}>
            <Text>
              {item.name}
            </Text>
          </TouchableOpacity>)}

      </ScrollView>}
      <Details onPlusHandler={onPlusPressHandler} showPlus={props.showPlus} showDetails={showDetails} foodItem={foodItem} />
      <ScrollView style={styles.scrollitems}>

        {meals.map(item => <Card delete={true} item={item} key={item.id} onPress={onPressValuesHandler} />)}

      </ScrollView>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(227, 221, 201, 1)',
    flex: 1,
    // flexDirection: "row",
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // borderRadius: 10,
    // borderColor: 'black',
    // borderWidth: 1,
    // padding: 20,

    marginTop: windowHeight / 9,
    // marginBottom: windowHeight / 100,

  },
  viewContainer: {
    flex: 1,
    // flexGrow: ,
    marginTop: -10,
    // marginBottom: 10,
    width: '100%',
    minHeight: windowHeight / 8,
    maxHeight: windowHeight / 8,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollitems: {
    // flex: 1,
    // backgroundColor: 'red',
    // textAlign: 'center',
    // margin: 10,
    width: windowWidth - 50,


  }
})

export default Calculator
