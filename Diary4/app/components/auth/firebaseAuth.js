import React, {useState, useEffect, useReducer} from 'react';
import {View, Text, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {storeData} from '../../database/async';
import {newUser, createUser} from '../../database/firestore';
import {setDates, delDates, today, nextDay} from '../../database/firestore';
export const signUp = props => {
  auth()
    .createUserWithEmailAndPassword(props.email, props.password)
    .then(() => {
      alert('User account create &signed in!');
      storeData('email', props.email);
      createUser(props.email);
      setDates(props.email, {count: 0, date: today});
      setDates(props.email, {count: 0, date: nextDay});
      storeData('Count', '0');
    })
    .catch(error => {
      if (error.code === 'auth/email-a,kllready-in-use') {
        alert('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
      }
      alert(error);
    });

  console.log(Response);
};

export const signIn = props => {
  auth()
    .signInWithEmailAndPassword(props.email, props.password)
    .then(() => {
      console.log('로그인완료');
      newUser();

      storeData('email', email);
      // storeData('nickname', props.nickName);
      return true;
    })
    .catch(error => {
      alert(error);
    });
  return false;
};
