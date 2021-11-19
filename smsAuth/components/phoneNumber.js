import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';

const phoneNumber = ({navigation}) => {
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, addPhoneNumber] = useState('+82');
  const [code, setCode] = useState('');
  const [user, setUser] = useState();
  const [get, setGet] = useState('인증번호 받기');
  const [status, setStatus] = useState('인증 미완료');

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);

    if (user == null) {
      setStatus('인증 미완료.');
    } else {
      setStatus('인증 완료!!!');
      setGet('인증번호 받기');
    }
  });
  async function signInWithPhoneNumber(phoneNumber) {
    setGet('재전송');
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    if (user) {
      console.log('====================================');
      console.log('오토 인증 완료');
      console.log('====================================');
    } else {
      try {
        await confirm.confirm(code);
        setLogged(true);
        console.log('인증완료 되었습니다.');
      } catch (error) {
        console.log(error);
      }
    }
  }
  function onAuthStateChanged(user) {
    setUser(user);
  }

  const SignOut = () => {
    auth().signOut();
    setGet('인증번호 받기');
  };
  console.log('User', user);

  return (
    <View style={styles.container}>
      <Text style={styles.highlight}>{status}</Text>
      <View style={styles.numberContainer}>
        <TextInput
          placeholder="전화번호 입력"
          onChangeText={phoneNumber => addPhoneNumber(phoneNumber)}
          defaultValue={phoneNumber}
        />

        <Button
          style={styles.button}
          title={get}
          onPress={() => signInWithPhoneNumber(phoneNumber)}
        />
      </View>
      <View style={styles.authContainer}>
        <TextInput
          placeholder="인증번호 입력"
          value={code}
          keyboardType={'numeric'}
          onChangeText={text => setCode(text)}
        />
        <Button
          style={styles.button}
          title="인증하기"
          onPress={() => confirmCode()}
        />
      </View>
      <View>
        <Button
          style={styles.logout}
          title="로그아웃"
          onPress={() => SignOut()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  color: {
    marginTop: 20,
    marginBottom: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 5,
  },
  button: {
    paddingLeft: 20,
    marginLeft: 40,
  },
  logout: {
    marginTop: 50,
  },

  highlight: {
    fontSize: 50,
  },
});
export default phoneNumber;
