import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, StyleSheet, Text, View} from 'react-native';

const Stack = createStackNavigator();
export default function BottomNavigation({nagivation}) {
  return (
    <View style={styles.bottom}>
      <Button style={styles.buttons} title="홈" />
      <Button
        style={styles.buttons}
        title="랭크"
        onPress={() => nagivation.push('Ranking')}
      />
      <Button style={styles.buttons} title="마이페이지" />
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',

    marginBottom: 20,

    justifyContent: 'space-evenly',
  },
  buttons: {
    flex: 1,
    alignItems: 'baseline',
  },
});
