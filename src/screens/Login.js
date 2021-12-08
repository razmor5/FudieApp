import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
// import LoginScreen from "react-native-login-screen";
import BG from '../../assets/login_bg.jpg'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import firebase from 'firebase';


// import firebase from 'firebase';

const Login = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const onSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then((userCredential) => {
        console.log(userCredential)
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
        <Text style={styles.text}>LET ME IN !</Text>
        <FormInput
          // labelValue={email}
          onChangeText={(input) => setUsername(input)}
          placeholderText="Email"
          iconType="mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          // labelValue={password}
          onChangeText={(input) => setPassword(input)}
          placeholderText="Password"
          // visible={true}
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Sign In"
          onPress={onSignIn}
        />

        <TouchableOpacity style={styles.forgotButton}
          onPress={() => props.navigation.navigate('ForgotPassword')}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => props.navigation.navigate('Register')}>
          <Text style={styles.navButtonText}>
            Don't have an acount? Create here
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


export default Login
