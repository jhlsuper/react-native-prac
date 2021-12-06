import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ranking from './ranking';

export default function RankingComponent() {
  // Set an initializing state whilst Firebase connects

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>유저 랭킹</Text>
      <View>
        <Ranking />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7487C5',
  },
  color: {
    alignContent: 'center',
    marginTop: 100,
    justifyContent: 'center',
  },
  titleText: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    backgroundColor: '#7487C5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
