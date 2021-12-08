import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions';
import Meals from '../components/Meals';
import Plus from '../components/Plus';
import BG from '../../assets/login_bg.jpg'
import AddForm from '../components/AddForm';
import firebase from 'firebase';
import "firebase/firestore";



const DayScreen = (props) => {
  let { dayName, date, navigator } = props.route.params;
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [plus, setPlus] = useState(false)
  // firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("sunday").get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //     });
  //   });

  const [meals, setMeals] = useState([])
  const [fetch, setFetch] = useState(false)

  const fetchMeals = async () => {
    let fetchedMeals = []
    await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection(days[date.getDay()]).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          fetchedMeals.push({
            id: doc.id,
            name: doc.data().name,
            checked: doc.data().checked,
            time: doc.data().time,
            cal: doc.data().cal
          })
        });
      });
    return fetchedMeals
    // console.log(fetchedMeals)
  }
  useEffect(() => {
    const getMeals = async () => {
      const mealsFromServer = await fetchMeals()
      setMeals(mealsFromServer.sort(function (a, b) {
        return a.time.localeCompare(b.time);
      }))
      console.log(mealsFromServer)
    }
    getMeals()
  }, [fetch])

  const onToggle = async (id, checked) => {

    await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection(days[date.getDay()]).doc(id)
      .set({
        checked: !checked
      }, { merge: true })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    setFetch(!fetch)
    // setMeals(meals.map(meal => meal.id === id ? { ...meal, checked: !meal.checked } : meal))
    // console.log(id)
  }
  const onSaveNewMeal = (meal) => {
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection(days[date.getDay()])
      .add(meal)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    // setMeals([...meals, meal])
    // console.log(meals)
    setFetch(!fetch)
  }

  props.navigation.setOptions({ title: days[date.getDay()] })

  const scrollViewRef = useRef();

  return (
    <ImageBackground
      source={BG}
      resizeMode="cover"
      style={styles.wrapper}
      blurRadius={15}
    // onLoad={() => alert("loaded!")}
    >

      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => plus && scrollViewRef.current.scrollToEnd({ animated: true })} showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>

        <View style={styles.container}>

          <Meals meals={meals} onToggle={onToggle} navigator={navigator} />

        </View>
        <View style={styles.container1}>

          {plus ? <AddForm newId={meals.length + 1} save={onSaveNewMeal} done={() => setPlus(!plus)} /> :
            <Plus onPlus={() => setPlus(!plus)} />}
          {/* <AddForm /> */}
        </View>

      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(227, 221, 201, 1)',
    flex: 1,
    // flexDirection: "row",
    // justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
    // borderRadius: 10,
    // borderColor: 'black',
    // borderWidth: 1,
    // padding: 20,

    marginTop: windowHeight / 9,
    marginBottom: windowHeight / 9,
  },
  container1: {
    // backgroundColor: 'rgba(227, 221, 201, 1)',
    flex: 1,
    // flexDirection: "row",
    // justifyContent: 'center',
    alignItems: 'center',
    // marginTop: windowHeight / 9,
    marginBottom: windowHeight / 9,
  },
  title: {
    flex: 1,
    color: '#007aff',
    fontSize: 42,
  },
  wrapper: {
    // backgroundColor: 'rgba(227, 221, 201, 0.7)',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
    borderRadius: 10,
  },
})

export default DayScreen
