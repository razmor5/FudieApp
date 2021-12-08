import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions';
import Autocomplete from 'react-native-autocomplete-input'
import FoodInput from '../components/FoodInput';
import Details from '../components/Details';


const MealScreen = (props) => {
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState(false);
  const data = ["fsdfsdds", "ggggg", "yyyyyyy", "yyyyyyy", "yyyyyyy"];
  const onChangeTextHandler = (input) => {
    setInput(input)
    if (input === "") {
      setDisplay(false)
    }
    else {
      setDisplay(true)
    }
    console.log(display)
  }
  const onPickOptionTextHandler = (input) => {
    setInput(input)
    setDisplay(false)

  }
  return (
    <View style={styles.container}>
      <FoodInput
        iconType="check"
        labelValue={input}
        onChangeText={onChangeTextHandler}
        placeholderText="Search" />
      {display && <ScrollView style={styles.viewContainer}>
        {data.map(item => <TouchableOpacity onPress={() => { onPickOptionTextHandler(item) }}>
          <Text>
            {item}
          </Text>
        </TouchableOpacity>)}

      </ScrollView>}
      <Details />

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(227, 221, 201, 1)',
    flex: 1,
    // flexDirection: "row",
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // borderRadius: 10,
    // borderColor: 'black',
    // borderWidth: 1,
    // padding: 20,

    marginTop: windowHeight / 8,
    // marginBottom: windowHeight / 100,

  },
  viewContainer: {
    flex: 1,
    // flexGrow: ,
    marginTop: -10,
    // marginBottom: 10,
    width: '100%',
    minHeight: windowHeight / 8,
    maxHeight: windowHeight / 8,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#fff',
  }
})

export default MealScreen
