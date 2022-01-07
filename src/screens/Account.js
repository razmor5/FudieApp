import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions'
import firebase from 'firebase';
import "firebase/firestore";
import Loading from './Loading';
import PersonalInformation from '../components/PersonalInformation';
import AccountForm from '../components/AccountForm';
import FormButton from '../components/FormButton';
import PredictForm from '../components/PredictForm';

const Account = () => {
  const [load, setLoad] = useState(false)
  const [predict, setPredict] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({})

  const fetchPersonalInfo = async () => {
    // let fetchedMeals = []
    await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
      .then((doc) => {
        setPersonalInfo(doc.data())
      })
      .catch((error) => {
        // alert(error.message)
      })
      ;

    // setPersonalInfo({...personalInfo, age:26, weight:83, height:178})
    setLoad(true)
    // return fetchedMeals
  }

  const onEditPressHandler = async (input) => {
    await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
      age: input.age,
      weight: input.weight,
      height: input.height,
      gender: input.gender

    }, { merge: true })
    setPersonalInfo({ ...personalInfo, age: input.age, weight: input.weight, height: input.height, gender: input.gender })
  }

  const predictPressHandler = () => {
    if (personalInfo.gender && personalInfo.age && personalInfo.weight && personalInfo.height) {
      setPredict((lastState) => !lastState)
    }
    else {
      Alert.alert("No Personal Information", "fill your personal information and try again")
    }
  }

  useEffect(() => {
    fetchPersonalInfo()
  }, [])

  if (!load) {
    return (
      <Loading />
    )
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>

        <PersonalInformation personalInfo={personalInfo} />
        {/* <AccountForm onEditPress={onEditPressHandler} /> */}
        {predict &&
          <PredictForm personalInfo={personalInfo} onDone={() => { setPredict(false) }} />
        }
        <View>
          <FormButton
            buttonTitle={`${predict ? "CLOSE" : "PREDICT"}`}
            onPress={predictPressHandler}
          />
        </View>
      </View>

    </ScrollView>
  )

}

const styles = StyleSheet.create({
  container: {
    // marginTop:30,
    // backgroundColor:'green',
    marginTop: windowHeight / 15,
    height: windowHeight / 1.1,
    // justifyContent: 'center'

  },
  wrapper: {
    alignItems: 'center'

  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: windowHeight / 7,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: windowHeight / 70,
  }
})

export default Account
