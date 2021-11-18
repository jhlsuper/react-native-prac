import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import SmsListener from 'react-native-android-sms-listener';
import {createStackNavigator} from '@react-navigation/stack';
import phoneNumber from './components/phoneNumber';
import fakeConfirm from './components/fakeConfirm';
import realConfirm from './components/realConfirm';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Phone" component={phoneNumber} />
        <Stack.Screen name="Fake" component={fakeConfirm} />
        <Stack.Screen name="Real" component={realConfirm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
