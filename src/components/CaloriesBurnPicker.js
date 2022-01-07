import React, { useState } from 'react'
import { View, Text } from 'react-native'
import ActiveButton from './ActiveButton'
import FormInput from './FormInput'



const CaloriesBurnPicker = (props) => {

    const [other, setOther] = useState("")
    const [otherShow, setOtherShow] = useState(false)
    const [listOfOptions, setListOfOptions] = useState([
        {
            title: `Not Active At All - ${Math.round(props.BMR)}`,
            amount: Math.round(props.BMR),
            checked: false
        },
        {
            title: `A Bit Active - ${Math.round(1.375 * props.BMR)}`,
            amount: Math.round(1.375 * props.BMR),
            checked: false
        },
        {
            title: `Active - ${Math.round(1.55 * props.BMR)}`,
            amount: Math.round(1.55 * props.BMR),
            checked: false
        },
        {
            title: `Very Active - ${Math.round(1.725 * props.BMR)}`,
            amount: Math.round(1.725 * props.BMR),
            checked: false
        },
        {
            title: `Athlet - ${Math.round(1.9 * props.BMR)}`,
            amount: Math.round(1.9 * props.BMR),
            checked: false
        },
        {
            title: "Other",
            amount: -1,
            checked: false
        }
    ])

    const onPickHandler = (amount) => {
        if (amount === -1) {
            if (otherShow) {
                if (other !== "" && other > 0) {
                    props.onActivePress(other)
                    // setOther("")
                    setOtherShow(!otherShow);
                }
            }
            else {
                setOtherShow(!otherShow);
            }
        }
        else {
            // setOther("")
            setOtherShow(false);
            props.onActivePress(amount)
        }
        setListOfOptions(lastState => lastState.map(option => option.amount === amount ? { ...option, checked: true } : { ...option, checked: false }))
    }

    return (
        <View>
            {listOfOptions.map(option =>
                <ActiveButton
                    buttonTitle={`${option.title} ${option.amount === -1 ? `${other && "- "}` + other : ""}`}
                    onPress={() => { onPickHandler(option.amount) }}
                    checked={option.checked}
                />
            )}
            {otherShow &&
                <View>

                    <FormInput
                        labelValue={other}
                        onChangeText={(input) => setOther(parseInt(input))}
                        placeholderText="Calories Burn"
                        iconType="rocket1"
                        keyboardType='number-pad'
                    />
                </View>
            }
        </View>
    )
}

export default CaloriesBurnPicker
