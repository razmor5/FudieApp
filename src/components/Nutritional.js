import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Plus from './Plus';
import { windowHeight, windowWidth } from '../../Dimensions';
import ChartPie from './ChartPie';



const Nutritional = (props) => {
  const [showValues, setShowValues] = useState(true)

  const pressShowHideHandler = () => {
    setShowValues(!showValues)
  }

  return (
    <View>
      {showValues &&

        <View style={styles.wrapper}>
          <View style={styles.left}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>calories: {Math.round(props.foodItem.calories * parseInt(props.amount) / 100)}</Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={{
                fontSize: 16,
                // borderBottomWidth: 1,
                color: '#3a47ff',
                // borderBottomWidth: 1,
                fontWeight: 'bold',
                textShadowColor: '#717171',
                textShadowOffset: { width: 2, height: 1 },
                textShadowRadius: 2,
              }}>

                protein: {Math.round(((props.foodItem.protein * parseInt(props.amount) / 100) + Number.EPSILON) * 100) / 100}</Text>
            </View>

            <View style={styles.textWrapper}>
              <Text style={{
                fontSize: 16,
                color: '#34ff86',
                // borderBottomWidth: 1,
                fontWeight: 'bold',
                textShadowColor: '#4c4c4c',
                textShadowOffset: { width: 2, height: 1 },
                textShadowRadius: 2,
              }}>
                carbs: {Math.round(((props.foodItem.carbohydrates * parseInt(props.amount) / 100) + Number.EPSILON) * 100) / 100}</Text>
            </View>

            <View style={styles.textWrapper}>
              <Text style={{
                fontSize: 16,
                color: '#ffca39',
                // borderBottomWidth: 1,
                fontWeight: 'bold',
                textShadowColor: '#4c4c4c',
                textShadowOffset: { width: 2, height: 1 },
                textShadowRadius: 2,
              }}>
                fat: {Math.round(((props.foodItem.fats * parseInt(props.amount) / 100) + Number.EPSILON) * 100) / 100}</Text>
            </View>

            <View style={styles.textWrapper}>
              <Text style={{
                fontSize: 16,
                color: '#ff1f1f',
                // borderBottomWidth: 1,
                fontWeight: 'bold',
                textShadowColor: '#717171',
                textShadowOffset: { width: 2, height: 1 },
                textShadowRadius: 2,
              }}>
                sugar: {Math.round(((props.foodItem.total_sugars * parseInt(props.amount) / 100) + Number.EPSILON) * 100) / 100}</Text>
            </View>


          </View>
          <View style={styles.right}>
            <ChartPie data={{
              protein: props.foodItem.protein,
              fat: props.foodItem.fats,
              carbs: props.foodItem.carbohydrates,
              sugar: props.foodItem.total_sugars,
            }} />

          </View>
        </View>
      }
      {props.delete &&
        <View style={{
          alignItems: 'center',
        }}>
          <Plus name="delete" onPlus={() => {
            Alert.alert('Are you sure?', 'Delete', [
              { text: 'Cancel', onPress: () => { console.log("canceled") } },
              { text: 'Delete', onPress: () => { console.log("deleted") } },
            ])
          }} />
        </View>
      }
      {
        props.showPlus &&
        <View style={styles.container1}>
          {showValues ?
            <View style={styles.wrapper}>

              <Plus style={{
                marginRight: 10,
              }} onPlus={props.onPlus} />
              <Plus style={{
                marginRight: 10,
              }} onPlus={pressShowHideHandler}
                name="up"
              />
            </View>
            :
            <Plus style={{
              marginRight: 10,
            }} onPlus={pressShowHideHandler}
              name="down"
            />
          }
        </View>
      }
    </View >
  )
}

const styles = StyleSheet.create({
  left: {
    flex: 1,
    marginRight: 10,
  },
  right: {
    flex: 1,
  },
  container: {
    marginTop: windowHeight / 40,
    width: '100%',
    // minHeight: windowHeight / 3,
    // maxHeight: windowHeight / 4,
    // backgroundColor: 'rgba(10, 10, 40, 0.9)',
    backgroundColor: 'rgba(150, 150, 150, 0.9)',
    // backgroundColor: 'green',
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    padding: 10,
  },
  container1: {
    alignItems: 'center',
  },
  text: {

    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',

  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWrapper: {
    borderBottomWidth: 1,
  },


})

export default Nutritional
