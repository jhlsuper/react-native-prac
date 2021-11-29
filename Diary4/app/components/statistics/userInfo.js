import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  TextInput,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {BarChart, ContributionGraph} from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';

const UserInfo = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.titleText}>총 집중한 시간 : </Text> */}
      {/* <Text style={styles.titleText}>가장 최근 공부한 날 :</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    paddingTop: 10,
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
  color: {
    marginTop: 100,
    backgroundColor: 'gray',
  },
});

export default UserInfo;
