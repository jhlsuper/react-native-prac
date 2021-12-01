import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ranking from './ranking';
export default function RankingComponent() {
  // Set an initializing state whilst Firebase connects
  const [rankLoaded, setRankLoaded] = useState(false);
  const sayhi = () => {
    console.log(hi);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>유저 랭킹</Text>

      {/* <Text>랭킹화면</Text> */}
      <Ranking />
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
  color: {
    alignContent: 'center',
    marginTop: 100,
    justifyContent: 'center',
  },
  titleText: {
    paddingTop: 10,
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
