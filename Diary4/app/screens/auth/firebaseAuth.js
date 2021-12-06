import auth from '@react-native-firebase/auth';
import {storeData} from '../../database/async';
import {newUser, createUser, createUser2} from '../../database/firestore';
import {setDates, delDates, today, nextDay} from '../../database/firestore';
export const signUp = props => {
  //회원가입.
  auth()
    .createUserWithEmailAndPassword(props.email, props.password)
    .then(() => {
      alert('User account create &signed in!');
      storeData('email', props.email); //async storage
      createUser(props.email);
      createUser2(props.email);
      setDates(props.email, {count: 0, date: today}); //오늘날짜의 count값 기입
      setDates(props.email, {count: 0, date: nextDay}); // 통계 화면에서 버그 방지를 위한 다음날 값0으로 기입
      storeData('Count', '0'); //async storage
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
  //로그인
  auth()
    .signInWithEmailAndPassword(props.email, props.password)
    .then(() => {
      console.log('로그인완료');
      storeData('email', email);
      return true;
    })
    .catch(error => {
      console.log(error);
    });
  return false;
};
