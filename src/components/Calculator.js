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
    console.log("fetched")
  }
  const fetchData = async () => {
    const data = await require('../../relevantdb.json');
    return data
  }

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

  const fetchMealsReq = async () => {
    let fetchedMealItems = []
    await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection(props.day).doc(props.meal.id).collection("FoodItems").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log("doc info", doc.data())
          fetchedMealItems.push({ ...doc.data(), showValues: false, key: doc.id })
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
    getData()
    setLoad(true)
  }, [])

  useEffect(() => {
    const getMeals = async () => {
      const mealsFromServer = await fetchMealsReq()
      setMeals(mealsFromServer)
    }
    getMeals()
  }, [fetchMeals])



  const onPressValuesHandler = (key) => {
    // setMealsValuesShow(mealsValuesShow.map((item) => item.id === id ? { ...item, showValues: true } : { ...item, showValues: false }))
    setMeals(meals.map((item) => item.key === key ? { ...item, showValues: !item.showValues } : { ...item, showValues: false }))
  }

  const onPressDeleteHandler = (key, cal) => {
    setMeals(meals.filter(item => item.key !== key))
    props.onDelete(key, cal)
  }



  const [input, setInput] = useState("");
  const [foodItem, setFoodItem] = useState({})
  const [display, setDisplay] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const onPlusPressHandler = async (input) => {
    setInput("")
    setFoodItem({})
    setDisplay(false)
    setShowDetails(false)
    props.onPlusHandler(input, fetchRequest)
    // fetchRequest()
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
      // console.log('checking...')
      if (input === "") {
        setDisplay(false)
        setShowDetails(false)
      }
      else {
        if (!showDetails) {

          setDisplay(true)
        }
      }
    }, 300)

    return () => {
      // console.log('CLEANUP')
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
      {(display && input.length > 2) && <ScrollView style={styles.viewContainer}>
        {db.filter((item) => item.name.includes(input))
          .map(item => <TouchableOpacity key={item.code} onPress={() => { onPickOptionTextHandler(item) }}>
            <Text>
              {item.name}
            </Text>
          </TouchableOpacity>)}

      </ScrollView>}
      <Details onlyCalc={props.onlyCalc} onPlusHandler={onPlusPressHandler} showPlus={props.showPlus} showDetails={showDetails} foodItem={foodItem} />
      <ScrollView style={styles.scrollitems}>

        {meals.map(item => <Card item={item} key={item.key} onPress={onPressValuesHandler} onDelete={onPressDeleteHandler} />)}

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
