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

      {props.personalInfo.gender ?
        <View style={styles.wrapper}>

          <Text style={styles.text}>gender: {props.personalInfo.gender}</Text>
        </View> :
        <View >

          <Text style={styles.text}>You can edit your personal information by pressing the 'Edit' button.</Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(150, 150, 150, 0.7)',
    width: windowWidth / 1.2,
    paddingTop: 5,
    justifyContent: 'center',
    paddingBottom: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    borderColor: 'rgba(150, 150, 150, 0.7)',
  },
  wrapper: {
    width: windowWidth / 1.9,
    // margin: 3,
    marginTop: 5,
    height: windowHeight / 15,
    marginBottom: 10,
    // padding: 10,
    backgroundColor: 'rgba(150, 150, 150, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.9)',
    borderRadius: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    height: windowHeight / 15,
    color: 'rgba(25, 25, 25, 0.8)',
    // marginTop:windowHeight/7,
  },
  text: {
    fontSize: 16,
    color: 'rgba(25, 25, 25, 0.8)',
    fontWeight: 'bold',
    // borderBottomWidth:1,
    // paddingHorizontal:10,
    textAlign: 'center',
    // paddingVertical: 15,
    // marginTop:windowHeight/70,
  }
})

export default PersonalInformation
