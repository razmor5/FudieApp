import React from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import Day from '../components/Day'
import { windowHeight, windowWidth } from '../../Dimensions';
import BG from '../../assets/login_bg.jpg'



const Home = (props) => {
  const day1 = new Date();
  const day2 = new Date(day1.getTime() + 1 * 24 * 60 * 60 * 1000);
  const day3 = new Date(day1.getTime() + 2 * 24 * 60 * 60 * 1000);
  const day4 = new Date(day1.getTime() + 3 * 24 * 60 * 60 * 1000);
  const day5 = new Date(day1.getTime() + 4 * 24 * 60 * 60 * 1000);
  const day6 = new Date(day1.getTime() + 5 * 24 * 60 * 60 * 1000);
  const day7 = new Date(day1.getTime() + 6 * 24 * 60 * 60 * 1000);
  const navigateDay = (item) => {
    // console.log(item)
    props.navigation.navigate('Daily routine')
  }
  return (
    <ImageBackground
      source={BG}
      resizeMode="cover"
      style={styles.wrapper}
      blurRadius={15}
    >
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
    marginBottom: windowHeight / 12,
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

export default Home
