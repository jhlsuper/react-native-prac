import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {StyleSheet, Text, useColorScheme, View} from 'react-native';

function DiaryComponent() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Diray Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default DiaryComponent;
