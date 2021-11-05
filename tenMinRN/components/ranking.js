import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function RankingScreen({navigation}) {
  return (
    <View style={styles.screen}>
      <Text>랭킹 화면</Text>
      <Button title="랭킹 화면" onPress={() => navigation.push('Ranking')} />
      <Button title="홈 화면" onPress={() => navigation.navigate('Home')} />
      <Button title="뒤로 가기" onPress={() => navigation.goBack()} />
      <Button
        title="스택 첫 화면으로 가기"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },
});
