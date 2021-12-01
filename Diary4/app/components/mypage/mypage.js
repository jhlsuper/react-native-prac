import React, {useState, useEffect, useReducer} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import _, {size, times} from 'lodash';
import auth from '@react-native-firebase/auth';

const MyPage = () => {
  const [userEmail, setUser] = useState('');

  useEffect(() => {
    setUser(auth().currentUser.email);
  }, []);

  // console.log('datedatedate', weekBefore, monthBefore, today);

  return (
    <View style={styles.container}>
      <Text style={styles.userInfoTxt}> 이메일 : {userEmail}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  userInfoTxt: {
    fontSize: 30,
    color: 'lightgray',
  },
});
export default MyPage;
