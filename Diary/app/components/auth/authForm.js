import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {StyleSheet, Text, useColorScheme, View, TextInput} from 'react-native';

function AuthForm() {
  state = {
    myTextInput: '',
  };
  return (
    <View>
      <TextInput
        value={this.state.myTextInput}
        autoCapitalize={'none'}
        keyboardType={'email-address'}
        style={styles.input}
        placeholder="이메일 주소"
        placeholderTextColor="#ddd"
      />
      <TextInput
        value={this.state.myTextInput}
        autoCapitalize={'none'}
        keyboardType={'email-address'}
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#ddd"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    fontSize: 17,
    padding: 5,
    marginTop: 30,
  },
});

export default AuthForm;
