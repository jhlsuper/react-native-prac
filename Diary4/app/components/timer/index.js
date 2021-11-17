import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import Timer from './timer';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import PopupButton from './popup_button';
import Instruction from './instruction';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setDates,
  delDates,
  today,
  nextDay,
  newUser,
} from '../../database/firestore';

const TimerComponent = () => {
  const user = auth().currentUser;
  const [stop, setStop] = React.useState(false);
  const [count, setCounts] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(user.email);
  newUser('jhlsuper1234@gmail.com');
  useEffect(() => {
    //count 업데이트 되면 map object 업데이트해주기
    if (count == 0) {
      // storeData('Date', today);
      // storeData('Count', count.toString());
      setDates(user.email, {count: count, date: today});
      setDates(user.email, {count: 0, date: nextDay});
    } else {
      // storeData('Count', count.toString());
      delDates(user.email, {count: count - 1, date: today});
      setDates(user.email, {count: count, date: today});
    }
  }, [count]);

  return (
    <View style={styles.screen}>
      <View style={styles.flex1}>
        <PopupButton
          visible={modalVisible}
          turnVisible={() => setModalVisible(!modalVisible)}
        />
      </View>

      <Instruction
        visible={modalVisible}
        turnVisible={() => setModalVisible(!modalVisible)}
      />
      <View style={styles.flex3}>
        <Timer sec={3} cnt={count} addCount={() => setCounts(count + 1)} />
      </View>
      <View style={styles.flex1}>
        <Text style={styles.text}>{`${count} 번 완료`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 6,
    backgroundColor: '#7487C5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flex1: {
    flex: 2.5,
    marginTop: 60,
  },
  flex3: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    fontStyle: 'italic',
  },
});

export default TimerComponent;
