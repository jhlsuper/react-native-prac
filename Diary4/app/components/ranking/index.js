import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Ranking from './ranking';
export default function RankingComponent() {
  // Set an initializing state whilst Firebase connects

  return (
    <View style={styles.container}>
      {/* <Text>랭킹화면</Text> */}
      <Ranking />
    </View>
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
  color: {
    alignContent: 'center',
    marginTop: 100,
    justifyContent: 'center',
  },
});
