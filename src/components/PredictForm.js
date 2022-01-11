import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import FormInput from './FormInput'
import { windowHeight, windowWidth } from '../../Dimensions'
import FormButton from './FormButton'
import CaloriesBurnPicker from './CaloriesBurnPicker'
import Loading from '../screens/Loading'
import LottieView from 'lottie-react-native';
import firebase from 'firebase';
import "firebase/firestore";


const PredictForm = (props) => {
    const [destinationWeight, setDestinationWeight] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [caloriesByWeek, setCaloriesByWeek] = useState([])
    const [caloriesBurn, setCaloriesBurn] = useState("")

    let s
    props.personalInfo.gender === "Male" ? s = 5 : s = -161
    let BMR = (s + (props.personalInfo.weight * 10) + (props.personalInfo.height * 6.25) - (props.personalInfo.age * 5))

    const fetchCaloriesPerDay = async () => {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let calsPerDays = []
        days.map(async (item) => {
            await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection(item).get()
                .then((querySnapshot) => {
                    let calPerDay = 0
                    querySnapshot.forEach((doc) => {
                        if (doc.exists) {
                            if (doc.id != 'MANAGE') {
                                // console.log(doc.id, doc.data())
                                // alert("yes")
                                calPerDay += doc.data().cal
                            }

                            // fetchedDays = []
                        }
                        else {

                            alert("no")
                        }
                    })
                    console.log("before")
                    setCaloriesByWeek((lastState) => [...lastState, {
                        day: item,
                        cal: Math.round(calPerDay)
                    }])
                    console.log(calsPerDays)
                })
                .catch((err) => {
                    alert(err.message)
                })
        })
        // return calsPerDays
    }

    useEffect(() => {
        const getCaloriesByWeek = async () => {
            await fetchCaloriesPerDay().then(() =>
                setLoaded(true)
            )
        }
        if (!loaded) {
            getCaloriesByWeek()
        }
    }, [])

    const onCalcPressHandler = () => {
        if (caloriesBurn && destinationWeight) {
            // if (true) {
            setLoaded(false)
            setTimeout(() => {
                setLoaded(true)
                let avg = 0
                let notZero = 0
                caloriesByWeek.forEach((day) => {
                    if (day.cal) {
                        avg += day.cal
                        notZero += 1
                    }
                })
                if (notZero) {
                    avg /= notZero
                    console.log(avg)
                }
                else {
                    Alert.alert("Error", "Try to edit your food diary")
                    return
                }
                let weight
                let calories
                if (destinationWeight > props.personalInfo.weight) {
                    weight = destinationWeight - props.personalInfo.weight
                    calories = avg - caloriesBurn
                }
                else {
                    weight = props.personalInfo.weight - destinationWeight
                    calories = caloriesBurn - avg
                }
                calories *= 0.00013
                weight /= calories
                weight /= 7
                if (destinationWeight === props.personalInfo.weight) {
                    Alert.alert("WIERD...", "You already achived your goal!")
                }
                else if ((Math.round(weight * 10) / 10) < 0) {
                    Alert.alert("Oops...", "Looks like you need to edit your food diary or start working out more!")
                }
                else {
                    Alert.alert(`${Math.round(weight * 10) / 10}`, "weeks to your goal!")
                }
                setDestinationWeight("")
                setCaloriesBurn("")
                props.onDone()
            }, 1000)

        }
        else {
            Alert.alert("Missing Information", "Please make sure to fill your destination weight and to pick your activity level.")
        }
    }

    const onActivePressHandler = (calories) => {
        setCaloriesBurn(calories)
    }

    return (
        <View style={styles.container}>
            {loaded ?
                <View style={styles.wrapper}>
                    {/* {caloriesByWeek.map(item => <Text>{item.day} {item.cal}</Text>)} */}

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

                    <CaloriesBurnPicker BMR={BMR} onActivePress={onActivePressHandler} />

                    <FormButton
                        buttonTitle={"CALC"}
                        onPress={onCalcPressHandler}
                    />
                </View> :
                <LottieView style={{ width: '100%' }}
                    source={require('../../assets/calculationg.json')}
                    colorFilters={[
                        {
                            keypath: 'button',
                            color: '#F00000',
                        },
                        {
                            keypath: 'Sending Loader',
                            color: '#F00000',
                        },
                    ]}
                    autoPlay
                    loop
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(150, 150, 150, 0.7)',
        width: windowWidth / 1.2,
        padding: 30,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        borderColor: 'rgba(150, 150, 150, 0.7)',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        // marginBottom:windowHeight/80,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: windowHeight / 80,
        // marginTop:windowHeight/70,
    },
    wrapper: {
        alignItems: 'center'
    }
})

export default PredictForm
