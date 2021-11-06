import React, {useState, useRef, useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import Timer from './Timer';

const HomeScreen = ({navigation}) => {
  const [stop, setStop] = React.useState(false);
  return (
    <View style={styles.screen}>
      <Timer />
      <Text style={styles.text}>{/* {minute}분 {r_second}초 */}</Text>
      {/* <TouchableOpacity onPress={() => setStop(true)}>
        <Text>SetTrue</Text>
      </TouchableOpacity> */}
      {/* <Button title="시작하기" /> */}
    </View>
  );
};

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
  text: {
    fontSize: 50,

    color: 'red',
  },
});
export default HomeScreen;
