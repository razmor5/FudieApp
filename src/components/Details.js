import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Picker } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions';
import FoodInput from './FoodInput'



const Details = () => {
  const [amount, setAmount] = useState(0)
  const onChangeTextHandler = (input) => {
    setAmount(parseInt(input))
    if (isNaN(amount)) {
      setAmount(0)
    }
    console.log(amount)
  }
  return (
    <View style={styles.container}>
      <FoodInput
        iconType="check"
        labelValue={amount}
        onChangeText={(input) => {
          onChangeTextHandler(input)
        }}
        placeholderText="Amount(gm)"
        keyboardType='number-pad' />
      <Text style={styles.text}>fgfdg</Text>

      {/* <Picker
        style={styles.picker}
        selectedValue={amount}
        onValueChange={(input) => {
          onChangeTextHandler(input)
        }}

      >
        <Picker.Item label={1} value={1} />
        <Picker.Item label={2} value={2} />
        <Picker.Item label={3} value={3} />
      </Picker> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: windowHeight / 40,
    width: '100%',
    minHeight: windowHeight / 4,
    maxHeight: windowHeight / 4,
    backgroundColor: 'green',
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    padding: 10,
  },
  text: {

    fontSize: 16,
  },
  picker: {
    // flex: 1,
    backgroundColor: '#fafafa',
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    borderColor: 'red',
    borderWidth: 1,
    // justifyContent: 'center',
  },
})

export default Details
