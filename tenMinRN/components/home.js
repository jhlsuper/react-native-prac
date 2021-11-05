import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// const myIcon = <Icon name="rocket" size={30} color="#900" />;
export default function HomeScreen({navigation}) {
  return (
    <View style={styles.screen}>
      <Text>Home screen</Text>
      <Button
        title="랭킹 화면"
        onPress={() => navigation.navigate('Ranking')}
      />
      {/* <Icon name="flask" size={30} color="#900" /> */}
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
