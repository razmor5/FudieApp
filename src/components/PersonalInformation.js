import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions'


const PersonalInformation = (props) => {
  console.log(props.personalInfo)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {props.personalInfo.name}</Text>
      {
        props.personalInfo.age &&
        <View style={styles.wrapper}>
          <Text style={styles.text}>age: {props.personalInfo.age}</Text>
        </View>
      }


      {props.personalInfo.weight &&
        <View style={styles.wrapper}>

          <Text style={styles.text}>weight: {props.personalInfo.weight} kg</Text>
        </View>
      }


      {props.personalInfo.height &&
        <View style={styles.wrapper}>

          <Text style={styles.text}>height: {props.personalInfo.height} cm</Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(150, 150, 150, 0.7)',
    width: windowWidth / 1.2,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    borderColor: 'rgba(150, 150, 150, 0.7)',
  },
  wrapper: {
    width: windowWidth / 1.5,
    margin: 3,
    padding: 10,
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.9)',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    // marginTop:windowHeight/7,
  },
  text: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 'bold',
    // borderBottomWidth:1,
    // paddingHorizontal:10,
    textAlign: 'center',
    // marginTop:windowHeight/70,
  }
})

export default PersonalInformation
