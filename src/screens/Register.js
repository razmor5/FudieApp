import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
// import LoginScreen from "react-native-login-screen";
import BG from '../../assets/login_bg.jpg'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import { windowHeight, windowWidth } from '../../Dimensions';
import firebase from 'firebase';
import "firebase/firestore";


const Register = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const onSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(username, password)
      .then((result) => {
        firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            username,
            name
          })
        console.log(result)
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
        <Text style={styles.text}>I WANT IT TOO !</Text>
        <FormInput
          // labelValue={email}
          onChangeText={(input) => setName(input)}
          placeholderText="Name"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false}
        />
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
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Sign Up"
          onPress={onSignUp}
        />

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By registering, you confirm that you accept our{' '}
            <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
              <Text style={[styles.color_textPrivate, { color: '#dd4e50' }]}>
                Terms of service{' '}
              </Text>
            </TouchableOpacity>

            <Text style={styles.color_textPrivate}> and </Text>

            <TouchableOpacity onPress={() => alert('Policy Clicked!')}>
              <Text style={[styles.color_textPrivate, { color: '#dd4e50' }]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.navButtonText}>
            Already have an account? Log In
          </Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>

  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(227, 227, 227, 0.8)',
    // minHeight: windowHeight,
    // minWidth: windowWidth,
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
  color_textPrivate: {
    fontSize: 18,
    fontWeight: '400',
    //   fontFamily: 'Lato-Regular',
    color: 'grey',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 25,
    justifyContent: 'center',
  },
});


export default Register
