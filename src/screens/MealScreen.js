import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions';
import Autocomplete from 'react-native-autocomplete-input'
import FoodInput from '../components/FoodInput';
import Details from '../components/Details';


const MealScreen = (props) => {
  const [input, setInput] = useState("");
  const [foodItem, setFoodItem] = useState({})
  const [display, setDisplay] = useState(false);
  const data = [
    {
      code: 41,
      sml: 11411119,
      name: "יוגורט ביו 3% שומן, תנובה",
      protein: 4.4,
      fat: 3,
      carbs: 4.6,
      calories: 65
    },
    {
      code: 43,
      sml: 11411149,
      name: "יוגורט, 1.5% שומן, שלי, ריוויון , תנובה",
      protein: 3.6,
      fat: 1.5,
      carbs: 5,
      calories: 48
    },
    {
      code: 45,
      sml: 11411219,
      name: "יוגורט של פעם 3% שומן, השומרון",
      protein: 4,
      fat: 3,
      carbs: 7,
      calories: 71
    }
  ];
  const onChangeTextHandler = (input) => {
    setInput(input)
    if (input === "") {
      setDisplay(false)
    }
    else {
      setDisplay(true)
    }
  }
  const onPickOptionTextHandler = (input) => {
    setInput(input.name)
    setFoodItem(input)
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
        {data.filter((item) => item.name.includes(input))
          .map(item => <TouchableOpacity onPress={() => { onPickOptionTextHandler(item) }}>
            <Text>
              {item.name}
            </Text>
          </TouchableOpacity>)}

      </ScrollView>}
      <Details foodItem={foodItem} />

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
