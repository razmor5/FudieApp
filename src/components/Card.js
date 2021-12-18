import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { windowHeight, windowWidth } from '../../Dimensions';

const Card = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>

        <Text>{props.item.name}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginRight: 20,
    marginLeft: 20,
    // backgroundColor: 'green',

    // width: windowWidth - 150,

  }
})

export default Card
