import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import SocialUser from './SocialUser'
import firebase from 'firebase';
import "firebase/firestore";

const SocialUsers = (props) => {

  return (
    <ScrollView>
      {props.users.map(user => <SocialUser uid={user} />)}
    </ScrollView>
  )
}

export default SocialUsers
