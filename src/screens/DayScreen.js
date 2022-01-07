import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions';
import { BG } from '../../BackGroundImage';
import Meals from '../components/Meals';
import Plus from '../components/Plus';
import AddForm from '../components/AddForm';
import firebase from 'firebase';
import "firebase/firestore";
import Loading from './Loading';



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
  const [edit, setEdit] = useState(true)
  const [fetch, setFetch] = useState(false)
  const [load, setLoad] = useState(false)
  const fetchRequest = () => {
    setFetch(!fetch)
  }

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
      setLoad(true)
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
    // fetchRequest()
    setMeals(meals.map(meal => meal.id === id ? { ...meal, checked: !meal.checked } : meal))
    console.log(id)
  }
  const onSaveNewMeal = (meal) => {
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection(days[date.getDay()])
      .add(meal)
      .then((docRef) => {
        setMeals((lastState) => [...lastState, { ...meal, id: docRef.id }].sort(function (a, b) {
          return a.time.localeCompare(b.time);
        }))
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    // setMeals([...meals, meal])
    // console.log(meals)
    // fetchRequest()
  }

  const onDeleteMealHandler = (id) => {
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection(days[date.getDay()]).doc(id).delete()
      .then(() => {
        setMeals((lastState) => lastState.filter(meal => meal.id !== id))

      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
  }


  const onAddHandler = (id, cal) => {
    setMeals((lastState) => lastState.map(meal => meal.id === id ? { ...meal, cal: cal } : meal))
  }

  const onEditPressHandler = () => {
    setEdit(lastState => !lastState)
  }

  const forceEditPressDone = () => {
    setEdit(lastState => true)
  }

  props.navigation.setOptions({
    title: days[date.getDay()],
    headerRight: () => (
      <TouchableOpacity onPress={onEditPressHandler}>
        <Text style={styles.text}>{edit ? "Edit" : "Done"}</Text>
      </TouchableOpacity>
    ),
  })



  const scrollViewRef = useRef();
  if (load) {
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

            <Meals onDeleteMeal={onDeleteMealHandler} forceEditPressDone={forceEditPressDone} edit={edit} onAdd={onAddHandler} onFetch={fetchRequest} day={days[date.getDay()]} meals={meals} onToggle={onToggle} navigator={navigator} />

          </View>
          <View style={styles.container1}>
            {!edit && <View>
              {plus ? <AddForm newId={meals.length + 1} save={onSaveNewMeal} done={() => setPlus(!plus)} /> :
                <Plus name='plus' onPlus={() => setPlus(!plus)} />}
            </View>}
          </View>

        </ScrollView>
      </ImageBackground>
    )
  }
  return (
    <Loading />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: windowHeight / 9,
    marginBottom: windowHeight / 9,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    marginBottom: windowHeight / 9,
  },
  title: {
    flex: 1,
    color: '#007aff',
    fontSize: 42,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: '#097beb',
    // fontWeight: 'bold',
    fontSize: 20,
  }

})

export default DayScreen
