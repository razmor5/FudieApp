import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions'
import firebase from 'firebase';
import "firebase/firestore";
import Loading from './Loading';
import PersonalInformation from '../components/PersonalInformation';
import AccountForm from '../components/AccountForm';
import FormButton from '../components/FormButton';
import PredictForm from '../components/PredictForm';

const Account = ({ navigation }) => {
  const [load, setLoad] = useState(false)
  const [predict, setPredict] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({})
  const [leftTitle, setLeftTitle] = useState('Predict')
  const [showEditForm, setShowEditForm] = useState(false)
  const [rightTitle, setRightTitle] = useState('Edit')
  const [showPredictForm, setShowPredictForm] = useState(false)


  const onPressLeftHandler = () => {
    setShowPredictForm(lastState => !lastState)
    setLeftTitle(LastState => LastState === 'Predict' ? 'Cancel' : 'Predict')
  }
  const onPressRightHandler = () => {
    setShowEditForm(lastState => !lastState)
    setRightTitle(LastState => LastState === 'Edit' ? 'Cancel' : 'Edit')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={onPressLeftHandler}>
          <Text style={styles.header}>{leftTitle}</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={onPressRightHandler}>
          <Text style={styles.header}>{rightTitle}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, leftTitle, rightTitle]);

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
      setShowPredictForm((lastState) => !lastState)
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

        {showEditForm ?
          <AccountForm onPressHandler={onPressRightHandler} onEditPress={onEditPressHandler} /> :
          <PersonalInformation personalInfo={personalInfo} />

        }
        {showPredictForm &&
          <PredictForm personalInfo={personalInfo} onDone={() => { onPressLeftHandler() }} />
        }
        <View>
          {/* <FormButton
            buttonTitle={`${predict ? "CLOSE" : "PREDICT"}`}
            onPress={predictPressHandler}
          /> */}
        </View>
      </View>

    </ScrollView>
  )

}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'green',
    // marginTop: 40,
    marginTop: windowHeight / 10,
    height: windowHeight / 1.1,
    // backgroundColor: 'green',
    // justifyContent: 'center'

  },
  wrapper: {
    alignItems: 'center',

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
  },
  header: {
    color: '#097beb',
    // fontWeight: 'bold',
    fontSize: 20,
  }
})

export default Account
