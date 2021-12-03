import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import Timer from './timer';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import PopupButton from './popupButton';
import Instruction from './instruction';
import auth from '@react-native-firebase/auth';
import {
  setDates,
  delDates,
  today,
  nextDay,
  getCount,
} from '../../database/firestore';
import {getData, storeData, getAllData, getIntData} from '../../database/async';
const TimerComponent = () => {
  const user = auth().currentUser;
  const [stop, setStop] = useState(false);
  const [count, setCounts] = useState(0);
  const [email, setEmail] = useState('');
  const [acount, setaCount] = useState(count);
  const [modalVisible, setModalVisible] = useState(false);
  const [asyncToday, setToday] = useState();

  useEffect(() => {
    getCount(user.email, setCounts);
    getData('Date', setToday);

    getAllData();
    // getData('email', setEmail);
  }, []);
  console.log('count', count);
  // console.log(asyncToday);
  useEffect(() => {
    console.log(count);
    //count 업데이트 되면 map object 업데이트해주기
    if (count == 0) {
      storeData('Date', today); //async strage 저장

      // storeData('Count', count.toString());
      // setDates(user.email, {count: count, date: today});
      // setDates(user.email, {count: 0, date: nextDay});
    } else {
      // storeData('Count', count.toString());
      delDates(user.email, {count: count - 1, date: today}); //이전 count data삭제
      setDates(user.email, {count: count, date: today}); //새로운 count값 data추가
    }
  }, [count]);

  return (
    <View style={styles.screen}>
      <View style={styles.flex1}>
        <PopupButton
          visible={modalVisible}
          turnVisible={() => setModalVisible(!modalVisible)}
        />
        {/* <Text>{user.email}</Text> */}
      </View>

      <Instruction
        visible={modalVisible}
        turnVisible={() => setModalVisible(!modalVisible)}
      />
      <View style={styles.flex3}>
        {/* sec: 기준 시간 현재 완료 값, setCount 전달*/}
        <Timer sec={5} cnt={count} addCount={() => setCounts(count + 1)} />
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
