import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import {windowHeight, windowWidth} from '../../Dimensions'
import firebase from 'firebase';
import "firebase/firestore";
import Loading from './Loading';
import PersonalInformation from '../components/PersonalInformation';

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
      
    </View>
  )
  
}

const styles = StyleSheet.create({
  container:{
    // marginTop:30,
    backgroundColor:'green',
    height:windowHeight/1.1,
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
