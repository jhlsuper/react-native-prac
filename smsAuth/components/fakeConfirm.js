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
const fakeConfirm = ({navigation}) => {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [User, setUser] = useState();

  async function confirmCode() {
    try {
      await confirm.confirm(code);

      console.log('confirmed');
    } catch (error) {
      console.log(error);
      console.log('Invalid code.');
    }
  }

  function onAuthStateChanged(user) {
    setUser(user);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(User);
  });

  //   if (!confirm) {
  //     return (
  //       <View style={styles.container}>
  //         <TextInput
  //           placeholder="전화번호 입력"
  //           onChangeText={phoneNumber => addPhoneNumber(phoneNumber)}
  //           defaultValue={phoneNumber}
  //         />
  //         <Button
  //           title="Phone Number Sign In"
  //           onPress={() => signInWithPhoneNumber(phoneNumber)}
  //         />
  //         <Button
  //           style={styles.color}
  //           title="로그아웃"
  //           onPress={() => SignOut()}
  //         />
  //       </View>
  //     );
  //   }
  return (
    <View style={styles.container}>
      <Text>가짜화면</Text>
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
export default fakeConfirm;
