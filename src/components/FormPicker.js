import React, { useState } from 'react'
import { View, Text, Picker, StyleSheet, TouchableOpacity } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FormButton from './FormButton';


const FormPicker = (props) => {
    const [pickGender, setPickGender] = useState(false)
    const onPressHandler = () => {
        setPickGender(lastState => !lastState)
        props.onPress()
    }
    return (
        <TouchableOpacity onPress={onPressHandler} style={
            styles.wrapper
        }>
            <View style={styles.iconStyle}>
                <AntDesign name={props.iconType} size={20} color="#666" />
            </View>
            <Text style={styles.input}>{props.selectedValue}</Text>
            {/* <Picker
                selectedValue={props.selectedValue}
                style={styles.dropdown}
                onValueChange={(itemValue) => props.onValueChange(itemValue)}
            >
                {props.data.map(item =>
                    <Picker.Item label={item.label} value={item.value} />
                )}
            </Picker> */}
            {/* {pickGender && <View >
                <View style={styles.formContainer}>
                    <View style={styles.formWrapper}>
                        <FormButton onPress={() => {
                            props.onValueChange("Male")
                            onPressHandler()
                        }} buttonTitle={"Male"} buttonColor={'#3f48cc'} />
                        <FormButton onPress={() => {
                            props.onValueChange("Female")
                            onPressHandler()
                        }} buttonTitle={"Female"} buttonColor={'#dc819b'} />
                    </View>
                </View>

            </View>
            } */}

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    dropdown: {
        padding: 10,
        // height: 1,
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: windowHeight / 15,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        // zIndex: -1,

    },
    iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
    },
    form: {
        backgroundColor: 'green',
        // position: 'absolute',
        // flex: 1,
        alignItems: 'center',
        zIndex: 100,
        marginLeft: -30,
        // width: windowWidth / 1.2,
        // height: windowHeight / 1.5,
        // marginTop: windowHeight / 6,
        // paddingTop: windowHeight / 8,

    },
    formWrapper: {
        // backgroundColor: 'rgba(150, 150, 150, 0.7)',
        alignItems: 'center',
        width: windowWidth / 2,
    },
    formContainer: {
        backgroundColor: 'rgba(150, 150, 150, 0.7)',
        alignItems: 'center',
        width: windowWidth / 1.7,
        height: windowHeight / 3,
        marginTop: windowHeight / 3,
        justifyContent: 'center',
        borderRadius: 20,
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        // fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default FormPicker
