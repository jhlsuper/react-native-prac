import React, {useState, useEffect} from 'react';
import {
  Button,
  TextInput,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Graph from './graph';
import UserInfo from './userInfo';
export default function Statiscs() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>한달 통계</Text>
      <UserInfo />
      <Graph />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7487C5',
  },
  titleText: {
    paddingTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  color: {
    marginTop: 100,
    backgroundColor: 'gray',
  },
});
