import React, {useState, useEffect, useReducer} from 'react';
import {View, Text, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

export const signUp = props => {
  auth()
    .createUserWithEmailAndPassword(props.email, props.password)
    .then(() => {
      alert('User account create &signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
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
      return true;
    })
    .catch(error => {
      alert(error);
    });
  return false;
};
