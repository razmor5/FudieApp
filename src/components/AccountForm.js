import React, { useState } from 'react'
import { View, Text, StyleSheet, Keyboard, Alert, Picker } from 'react-native'
import FormInput from './FormInput'
import { windowHeight, windowWidth } from '../../Dimensions'
import FormButton from './FormButton'
import FormPicker from './FormPicker'


const AccountForm = (props) => {

    const [age, setAge] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [gender, setGender] = useState("Gender")
    const [backDropActive, setBackDropActive] = useState(false)

    const onEditPressHandler = () => {
        if (validationInput(age) && validationInput(weight) && validationInput(height) && gender !== "Gender") {
            props.onEditPress({
                age: age,
                weight: weight,
                height: height,
                gender: gender,
            })
            Keyboard.dismiss()
            setAge("")
            setWeight("")
            setHeight("")
            props.onPressHandler()
        }
        else {
            Alert.alert("Can not save the changes!", "Please fill all the fields")
        }
    }

    const validationInput = (input) => {
        return input != "" && input > 0
    }

    return (

        <View style={{
            ...styles.container,
        }}>
            {
                !backDropActive &&
                <FormInput
                    labelValue={age}
                    onChangeText={input => setAge(parseInt(input))}
                    placeholderText="Age"
                    iconType="user"
                    keyboardType='number-pad'
                />
            }
            {
                !backDropActive &&
                <FormInput
                    labelValue={weight}
                    onChangeText={input => setWeight(parseInt(input))}
                    placeholderText="Weight"
                    iconType="dashboard"
                    keyboardType='number-pad'
                />
            }
            {
                !backDropActive &&
                <FormInput
                    labelValue={height}
                    onChangeText={input => setHeight(parseInt(input))}
                    placeholderText="Height"
                    iconType="totop"
                    keyboardType='number-pad'
                />
            }

            <FormPicker
                iconType={`${gender === "Male" ? "man" : "woman"}`}
                selectedValue={gender}
                onPress={() => { setBackDropActive(LastState => !LastState) }}
                onValueChange={(val) => { setGender(val) }}
                data={[
                    {
                        label: "Male",
                        value: "Male"
                    },
                    {
                        label: "Female",
                        value: "Female"
                    }]}
            />
            {backDropActive &&
                <View >
                    <View style={styles.formContainer}>
                        <View style={styles.formWrapper}>
                            <FormButton onPress={() => {
                                setGender("Male")
                                setBackDropActive(LastState => !LastState)
                                // onPressHandler()
                            }} buttonTitle={"Male"} buttonColor={'#3f48cc'} />
                            <FormButton onPress={() => {
                                setGender("Female")
                                setBackDropActive(LastState => !LastState)
                                // onPressHandler()
                            }} buttonTitle={"Female"} buttonColor={'#dc819b'} />
                        </View>
                    </View>

                </View>
            }

            {
                !backDropActive &&
                <FormButton
                    buttonTitle="Save"
                    onPress={onEditPressHandler}
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
        // backgroundColor: 'green'
    },
    dropdown: {
        // height: 50,
        color: '#333',

        height: windowHeight / 15,
        width: 150
    },
    wrapper: {
        backgroundColor: '#fff',
        width: windowWidth / 1.5,
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#ccc',
        height: windowHeight / 15,


        // textAlign: 'center',

    },
    formWrapper: {
        // backgroundColor: 'green',
        alignItems: 'center',
        width: windowWidth / 2,
    },
    formContainer: {
        // backgroundColor: 'rgba(150, 150, 150, 0.7)',
        alignItems: 'center',
        // width: windowWidth / 1.7,
        // height: windowHeight / 3,
        marginTop: windowHeight / 15,
        marginBottom: windowHeight / 15,
        justifyContent: 'center',
        borderRadius: 20,
    },
})

export default AccountForm
