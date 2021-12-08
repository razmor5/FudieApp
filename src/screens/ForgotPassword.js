import React, { useContext, useState, Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import BG from '../../assets/login_bg.jpg'
import firebase from 'firebase';



const ForgotPassword = (props) => {
  const [username, setUsername] = useState("")
  const onResetPassword = () => {
    firebase.auth().sendPasswordResetEmail(username)
      .then((userCredential) => {
        console.log(userCredential)
        alert('Your Password Has Been Reset\nGo Check Your Email')
        props.navigation.replace('Login')
        // this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        alert(error)
      })
  }
  return (
    <ImageBackground source={BG} resizeMode="cover" style={styles.container}>

      <View style={styles.container}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>PASSWORD RESET</Text>
        <FormInput
          // labelValue={email}
          onChangeText={(input) => setUsername(input)}
          placeholderText="Email"
          iconType="mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormButton
          buttonTitle="Reset Password"
          onPress={onResetPassword}
        />

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.navButtonText}>
            Back To Login
          </Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(227, 227, 227, 0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#5574a9',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginTop: 25,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#5574a9',
    // fontFamily: 'Lato-Regular',
  },
  image: {

  },
});

export default ForgotPassword
