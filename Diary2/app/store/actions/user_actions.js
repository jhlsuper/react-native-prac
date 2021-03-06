import {SIGN_IN, SIGN_UP} from '../types';

import axios from 'axios';
import {SIGNUP} from '../../utils/misc';
export function signIn(data) {
  return {
    type: SIGN_IN,
    payload: {
      email: data.email,
      token: data.password, //로그인 상태를 토큰으로 저장
    },
  };
}
export function signUp(data) {
  const request = axios({
    method: 'POST',
    url: SIGNUP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(err => {
      alert('에러 발행');
      return false;
    });

  return {
    type: SIGN_UP,
    payload: request,
  };
}
