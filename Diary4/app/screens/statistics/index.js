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
import Statistics_Templates from '../../components/templates/statistics_templates';
export default function Statiscs() {
  return (
    <SafeAreaView style={styles.container}>
      <Statistics_Templates />
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
});
