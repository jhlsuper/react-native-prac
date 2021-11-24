import React, {useState, useEffect} from 'react';
import {
  Button,
  TextInput,
  Text,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
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
  },
  color: {
    alignContent: 'center',
    marginTop: 100,
    justifyContent: 'center',
  },
});
