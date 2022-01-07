import React from 'react'
import { View, Text, Picker, StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions'
import AntDesign from 'react-native-vector-icons/AntDesign';


const FormPicker = (props) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.iconStyle}>
                <AntDesign name={props.iconType} size={20} color="#666" />
            </View>
            <Picker
                selectedValue={props.selectedValue}
                style={styles.dropdown}
                onValueChange={(itemValue) => props.onValueChange(itemValue)}
            >
                {props.data.map(item =>
                    <Picker.Item label={item.label} value={item.value} />
                )}
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({

    dropdown: {
        padding: 10,
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
})

export default FormPicker
