import React, {useState, useEffect, useReducer} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import _, {size, times} from 'lodash';
import {weekBefore, monthBefore, today} from '../../database/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
const user = auth().currentUser;
const MyPage = () => {
  // console.log('datedatedate', weekBefore, monthBefore, today);

  return (
    <View style={styles.container}>
      <Text style={styles.userInfoTxt}> 이메일 : {user.email}</Text>
    </View>
  );
};
console.log('user', user);
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
