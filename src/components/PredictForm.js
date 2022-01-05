import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FormInput from './FormInput'
import {windowHeight, windowWidth} from '../../Dimensions'
import FormButton from './FormButton'
import CaloriesBurnPicker from './CaloriesBurnPicker'


const PredictForm = (props) => {
    const [destinationWeight, setDestinationWeight] = useState("")
    const [caloriesBurn, setCaloriesBurn] = useState("")

    const onCalcPressHandler = ()=>{
        
    }

    const onActivePressHandler = (calories)=>{
        setCaloriesBurn(calories)
    }
    
    return (
        <View style = {styles.container}>
            <Text style={styles.title}>Enter Your Destination weight, our prediction system will predict the number of weeks to your goal!</Text>
            <Text style={styles.text}>(according to your diet diary)</Text>
            <FormInput
            labelValue={destinationWeight}
            onChangeText={(input) => setDestinationWeight(parseInt(input))}
            placeholderText="Destination weight"
            iconType="dashboard"
            keyboardType='number-pad'
            // secureTextEntry={true}
            />
            <Text style={styles.title}>How Active Are You?</Text>

            <CaloriesBurnPicker onActivePress={onActivePressHandler} />

            <FormButton
                buttonTitle={"CALC"}
                onPress={()=>{console.log("jkhghjk")}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'rgba(150, 150, 150, 0.7)',
        width:windowWidth/1.2,
        padding:30,
        borderWidth:1,
        borderRadius: 10,
        marginTop:10,
        borderColor:'rgba(150, 150, 150, 0.7)',
        alignItems: 'center'
    },
    title:{
        fontSize: 16,
        textAlign:'center',
        // marginBottom:windowHeight/80,
    }, 
    text:{
        fontSize: 14,
        textAlign:'center',
        marginBottom:windowHeight/80,
        // marginTop:windowHeight/70,
    }
})

export default PredictForm
