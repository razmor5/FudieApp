import React, { useEffect } from 'react'
import { StatusBar, View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import Day from '../components/Day'
import { windowHeight, windowWidth } from '../../Dimensions';
import BG from '../../assets/login_bg.jpg'
import firebase from 'firebase';
import "firebase/firestore";
import Notification from '../components/Notification';


const Home = (props) => {
  const day1 = new Date();
  const day2 = new Date(day1.getTime() + 1 * 24 * 60 * 60 * 1000);
  const day3 = new Date(day1.getTime() + 2 * 24 * 60 * 60 * 1000);
  const day4 = new Date(day1.getTime() + 3 * 24 * 60 * 60 * 1000);
  const day5 = new Date(day1.getTime() + 4 * 24 * 60 * 60 * 1000);
  const day6 = new Date(day1.getTime() + 5 * 24 * 60 * 60 * 1000);
  const day7 = new Date(day1.getTime() + 6 * 24 * 60 * 60 * 1000);

  const removeCheckFromOtherDays = async () => {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let todayDate = new Date()
    let today = days[todayDate.getDay()]
    let formalDate = todayDate.getDate().toString() + "/" + (todayDate.getMonth() + 1).toString() + "/" + todayDate.getFullYear().toString()
    console.log(formalDate)
    var db = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid)
    days.forEach(day => {
      // console.log("here", day, today)
      if (day === today) {

      }
      else {
        db.collection(day)
          .doc("MANAGE").get()
          .then(doc => {
            let fetchedDate = doc.data().lastChecked.toDate()
            let fetchedFormalDate = fetchedDate.getDate().toString() + "/" + (fetchedDate.getMonth() + 1).toString() + "/" + fetchedDate.getFullYear().toString()
            console.log(fetchedFormalDate)
            // console.log("the clear for ", day, " is: ", doc.data().clear)
            // console.log("the date for ", day, " is: ", doc.data().lastChecked.toDate())
          })
      }
    })
  }

  useEffect(() => {
    removeCheckFromOtherDays()
    StatusBar.setHidden(true);
  }, [])

  return (
    <ImageBackground
      source={BG}
      resizeMode="cover"
      style={styles.wrapper}
      blurRadius={15}
    >
      {/* <Notification /> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>

        <View style={styles.container}>
          <Day bg={BG} delay={0} date={day1} showRemaining={true} navigateTo={props} />
          <Day bg={BG} delay={100} date={day2} showRemaining={false} navigateTo={props} />
          <Day bg={BG} delay={200} date={day3} showRemaining={false} navigateTo={props} />
          <Day bg={BG} delay={300} date={day4} showRemaining={false} navigateTo={props} />
          <Day bg={BG} delay={400} date={day5} showRemaining={false} navigateTo={props} />
          <Day bg={BG} delay={500} date={day6} showRemaining={false} navigateTo={props} />
          <Day bg={BG} delay={600} date={day7} showRemaining={false} navigateTo={props} />

        </View>

      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: windowHeight / 9,
    marginBottom: windowHeight / 12,
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
})

export default Home
