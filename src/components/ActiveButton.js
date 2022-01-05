import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, ImageBackground } from "react-native";
import { windowHeight, windowWidth } from '../../Dimensions';


const ActiveButton = ({ buttonTitle, checked, ...rest }) => {
  return (
    <TouchableOpacity style={{
        marginTop: 10,
        width: windowWidth/1.2-20,
        height: windowHeight / 15,
        backgroundColor: `${checked?"#31345c":"#5f65bd"}`,
        padding: 10,
        // alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    }} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    // fontFamily: 'Lato-Regular',
  },
});

export default ActiveButton;