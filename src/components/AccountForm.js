import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FormInput from './FormInput'
import {windowHeight, windowWidth} from '../../Dimensions'
import FormButton from './FormButton'


const AccountForm = (props) => {

    const [age, setAge] = useState(0)
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)

    const onEditPressHandler = ()=>{
        setAge(0)
        setWeight(0)
        setHeight(0)
        props.onEditPress({
            age: age,
            weight:weight,
            height: height,
        })
    }

    return (

        <View style={styles.container}>
            {/* <Text>Edit</Text> */}
            <FormInput
            labelValue={age}
            onChangeText = {input=>setAge(parseInt(input))}
            placeholderText="Age"
            iconType="user"
            />
            <FormInput
            labelValue={weight}
            onChangeText = {input=>setWeight(parseInt(input))}
            placeholderText="Weight"
            iconType="dashboard"
            />
            <FormInput
            labelValue={height}
            onChangeText = {input=>setHeight(parseInt(input))}
            placeholderText="Height"
            iconType="totop"
            />
            <FormButton
                buttonTitle="Save"
                onPress={onEditPressHandler}
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

    }
})

export default AccountForm
