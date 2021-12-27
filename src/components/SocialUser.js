import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import firebase from 'firebase';
import "firebase/firestore";
import Following from './Following'

const SocialUser = (props) => {

  const [user, setUser] = useState({})

  const fetchUser = async () => {
    let fetchedUser = {}
    await firebase.firestore().collection("users").doc(props.uid).get()
      .then((doc) => {
        if (doc.exists) {
          fetchedUser = { ...doc.data(), uid: props.uid }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    return fetchedUser
  }

  useEffect(() => {
    const getUser = async () => {
      const userFromServer = await fetchUser()
      setUser(userFromServer)
    }
    getUser()
  }, [])

  return (
    <View>
      <Following user={user} />
    </View>
  )
}

export default SocialUser
