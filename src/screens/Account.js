import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import {windowHeight, windowWidth} from '../../Dimensions'
import firebase from 'firebase';
import "firebase/firestore";
import Loading from './Loading';
import PersonalInformation from '../components/PersonalInformation';
import AccountForm from '../components/AccountForm';

const Account = () => {
  const [load, setLoad] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({})

  const fetchPersonalInfo = async ()=>{
    // let fetchedMeals = []
    await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
      .then((doc) => {
        setPersonalInfo(doc.data())
      })
      .catch((error)=>{
        // alert(error.message)
      })
      ;
      
      // setPersonalInfo({...personalInfo, age:26, weight:83, height:178})
      setLoad(true)
    // return fetchedMeals
  }

  const onEditPressHandler = (input)=>{
    setPersonalInfo({...personalInfo, age:input.age, weight:input.weight, height:input.height})
  }

  useEffect(()=>{
    fetchPersonalInfo()
  }, [])

  if(!load){
    return(
      <Loading/>
    )
  }
  return(
    <View style={styles.container}>
      <PersonalInformation personalInfo = {personalInfo} />
      <AccountForm onEditPress = {onEditPressHandler} />
      
    </View>
  )
  
}

const styles = StyleSheet.create({
  container:{
    // marginTop:30,
    // backgroundColor:'green',
    marginTop:windowHeight/15,
    height:windowHeight/1.1,
    alignItems: 'center'

  },
  title:{
    fontSize: 24,
    textAlign:'center',
    marginTop:windowHeight/7,
  }, 
  text:{
    fontSize: 16,
    textAlign:'center',
    marginTop:windowHeight/70,
  }
})

export default Account
