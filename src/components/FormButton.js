import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, ImageBackground } from "react-native";
import { windowHeight, windowWidth } from '../../Dimensions';


const FormButton = ({ buttonColor, buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={{ ...styles.buttonContainer, backgroundColor: buttonColor || '#dd4e50' }} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    // backgroundColor: '#dd4e50',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    // flex: 1,
    // position: 'absolute',
    zIndex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    // fontFamily: 'Lato-Regular',
  },
});

export default FormButton;