import React, {useState, useEffect} from 'react';
import {Button, TextInput, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function PhoneVerification() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle create account button press
  async function createAccount() {
    try {
      await auth().createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      );
      console.log('User account created & signed in!');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    }
  }

  // Handle the verify phone button press
  async function verifyPhoneNumber(phoneNumber) {
    const confirmation = await auth().verifyPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  // Handle confirm code button press
  async function confirmCode() {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        code,
      );
      let userData = await auth().currentUser.linkWithCredential(credential);
      setUser(userData.user);
    } catch (error) {
      if (error.code == 'auth/invalid-verification-code') {
        console.log('Invalid code.');
      } else {
        console.log('Account linking error');
      }
    }
  }

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <Button
          style={styles.color}
          title="Login"
          onPress={() => createAccount()}
        />
        ;
      </View>
    );
  } else if (!user.phoneNumber) {
    if (!confirm) {
      return (
        <View style={styles.container}>
          <Button
            style={styles.color}
            title="Verify Phone Number"
            onPress={() => verifyPhoneNumber('+821084227963')}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput value={code} onChangeText={text => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </View>
    );
  } else {
    return (
      <Text style={styles.color}>
        Welcome! {user.phoneNumber} linked with {user.email}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  color: {
    marginTop: 100,
    backgroundColor: 'gray',
  },
});
