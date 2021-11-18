import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
} from 'react-native';

function NewsComponent() {
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, addPhoneNumber] = useState('+82');
  const [code, setCode] = useState('');
  console.log(phoneNumber);
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }
  auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user);
      auth().signOut();
    }
  });
  async function confirmCode() {
    try {
      await confirm.confirm(code);
      console.log('confirmed');
    } catch (error) {
      console.log(error);
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.color}
        value={code}
        onChangeText={text => setCode(text)}
      />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  );

  // return (

  // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //   <Text>News Screen</Text>
  // </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color: {
    backgroundColor: 'gray',
  },
});

export default NewsComponent;
