import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions';
import Nutritional from './Nutritional';

const Card = (props) => {

  const onPressHandler = () => {
    props.onPress(props.item.id)
    console.log(props.item)
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPressHandler}
    >

      <Text>{props.item.name}</Text>
      {props.item.showValues &&
        <Nutritional delete={props.delete} foodItem={props.item} showPlus={false} amount={props.item.amount} />
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(140, 150, 120, 0.9)',
    // backgroundColor: 'rgba(158, 106, 0, 0.9)',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.9)',
  }
})

export default Card
