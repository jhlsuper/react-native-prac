import React, {useState, useEffect} from 'react';
import {
  Button,
  TextInput,
  Text,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import auth from '@react-native-firebase/auth';
const logOut = () => {
  auth()
    .signOut()
    .then(() => console.log('user signed out'));
};
export default function MyPage() {
  // Set an initializing state whilst Firebase connects

  return (
    <View style={styles.container}>
      <Button title="로그아웃" onPress={logOut}>
        <Text>HiHello</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  color: {
    alignContent: 'center',
    marginTop: 100,
    justifyContent: 'center',
  },
});
