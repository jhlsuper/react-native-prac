import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
///총 집중시간 , 가장최근 공부한 날
const UserInfo = props => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.titleText}>총 집중한 시간 : {props.total}</Text>
      <Text style={styles.titleText}>가장 최근 공부한 날 : {props.recent}</Text>
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
    fontSize: 25,
    fontWeight: 'bold',
  },
  color: {
    marginTop: 100,
    backgroundColor: 'gray',
  },
  idContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default UserInfo;
