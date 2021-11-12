import {SIGN_IN, SIGN_UP} from '../types';
// import firebase from '../../database/firebase';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {SIGNUP} from '../../utils/misc';

export function signIn(data) {
  console.log(data);

  return {
    type: SIGN_IN,
    payload: {
      email: data.email,
      token: data.password, //로그인 상태를 토큰으로 저장
    },
  };
}
export function signUp(data) {
  // const request = axios({
  //   method: 'POST',
  //   url: SIGNUP,
  //   data: {
  //     email: data.email,
  //     password: data.password,
  //     returnSecureToken: true,
  //   },
  //   header: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(response => {
  //     console.log(response.data);
  //     return response.data;
  //   })
  //   .catch(err => {
  //     alert('에러 발행');
  //     return false;
  //   });
  auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(() => {
      console.log('User account create &signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });

  console.log(data);

  return {
    type: SIGN_UP,
    payload: request,
  };
}
