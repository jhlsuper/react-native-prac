import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function BottomNavigation() {
  return (
    <View style={styles.bottom}>
      <Button title="홈" />
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    flex: 4,
    justifyContent: 'space-evenly',
  },
  buttons: {
    flex: 1,
  },
});
