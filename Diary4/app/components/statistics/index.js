import React, {useState, useEffect} from 'react';
import {
  Button,
  TextInput,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Graph from './graph';

export default function Statiscs() {
  return (
    <View style={styles.container}>
      <Graph />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  color: {
    marginTop: 100,
    backgroundColor: 'gray',
  },
});
