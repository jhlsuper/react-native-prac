import React, {useState, useRef, useEffect} from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Timer from './timer';

const HomeScreen = ({navigation}) => {
  const [stop, setStop] = React.useState(false);
  const [count, setCounts] = useState(0);

  return (
    <View style={styles.screen}>
      <Timer sec={10} />

      <Text style={styles.text}>{/* {minute}분 {r_second}초 */}</Text>

      <Button title="시간 바꾸기" onPress={btn} />
      <Text>{count} 번 완료.</Text>
    </View>
  );
};

function btn() {
  return <Timer sec={1000} />;
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
  // text: {
  //   fontSize: 50,

  //   color: 'red',
  // },
});
export default HomeScreen;
