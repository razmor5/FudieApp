import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {windowHeight, windowWidth} from '../../Dimensions'


const PersonalInformation = (props) => {
    console.log(props.personalInfo)
    return (
        <View>
            <Text style = {styles.title}>Hello {props.personalInfo.name}</Text>
            {props.personalInfo.age&&
                <Text style = {styles.text}>age: {props.personalInfo.age}</Text>
            }
            {props.personalInfo.weight&&

                <Text style = {styles.text}>weight: {props.personalInfo.weight}</Text>
            }
            {props.personalInfo.height&&

                <Text style = {styles.text}>height: {props.personalInfo.height}</Text>
            }
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

export default PersonalInformation
