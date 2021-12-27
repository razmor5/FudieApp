import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import SocialUsers from '../components/SocialUsers'
import { windowHeight, windowWidth } from '../../Dimensions';
import AddForm from '../components/AddForm';


const SocialScreen = ({ navigation }) => {

  const [showAddForm, setShowAddForm] = useState(false)
  const [title, setTitle] = useState('Add')

  const onPressHandler = () => {
    setShowAddForm(lastState => !lastState)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPressHandler}>
          <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  let fakedb = ["fWkuRTctmihLFQRw21onTjNDKGk2"]
  // fakedb = []
  return (
    <View style={{
      ...styles.container,
      backgroundColor: showAddForm ? 'rgb(150,150,150)' : 'white'

    }}>
      {fakedb.length ?
        <View style={{
          opacity: showAddForm ? 0.2 : 1,
          display: showAddForm ? 'none' : 'flex'
        }}>

          <SocialUsers users={fakedb} />
        </View>
        :
        <View style={{
          opacity: showAddForm ? 0.2 : 1,
        }}>

          <Text>Ask someone to follow first try it now!</Text>
        </View>
      }
      {showAddForm && <View style={styles.form}>

        <Text>add</Text>
      </View>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: windowHeight / 7,
  },
  form: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'green',
    width: windowWidth / 1.5,
    height: windowHeight / 1.5,
    marginTop: windowHeight / 6,

  },
  text: {
    color: '#6179ff',
    fontWeight: 'bold',
    fontSize: 16,
  }
})

export default SocialScreen
