import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import SmsListener from 'react-native-android-sms-listener';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
const phoneNumber = ({navigation}) => {
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, addPhoneNumber] = useState('+82');
  const [code, setCode] = useState('');
  const [User, setUser] = useState(null);

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    console.log(User);
    if (User === null) {
      try {
        await confirm.confirm(code);

        console.log('confirmed');
      } catch (error) {
        console.log(error);
        console.log('Invalid code.');
      }
    } else {
      console.log('====================================');
      console.log('가짜가짜!!!');
      console.log('====================================');
    }
  }
  async function requestReadSmsPermission() {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: '(...)',
          message: "Why you're asking for...",
        },
      );
    } catch (err) {}
  }

  useEffect(() => {
    SmsListener.addListener(message => {
      console.log(message);
    }, []);
  });
  console.log(phoneNumber);
  console.log(User);
  requestReadSmsPermission();
  const SignOut = () => {
    auth().signOut();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="전화번호 입력"
        onChangeText={phoneNumber => addPhoneNumber(phoneNumber)}
        defaultValue={phoneNumber}
      />
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber(phoneNumber)}
      />
      <TextInput
        style={styles.color}
        value={code}
        onChangeText={text => setCode(text)}
      />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
      <Button style={styles.color} title="로그아웃" onPress={() => SignOut()} />
    </View>
  );

  if (User != null) {
    <View style={styles.container}>
      <Text>가짜화면</Text>
    </View>;
  } else {
    return (
      <View style={styles.container}>
        <TextInput value={code} onChangeText={text => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </View>
    );
  }
  return (
    <View>
      <Text>done</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  color: {
    marginTop: 20,
    marginBottom: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
export default phoneNumber;
