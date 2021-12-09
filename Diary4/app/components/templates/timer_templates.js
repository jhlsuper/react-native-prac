import React, {useState, useEffect} from 'react';
import ModalButton from '../molecules/modalButton';
import Instruction from '../organisms/instruction';
import Timer from '../organisms/timer';
import {PermissionsAndroid, Text, View} from 'react-native';
import styles_templates from './styles_templates';
import auth from '@react-native-firebase/auth';
import {
  setDates,
  delDates,
  today,
  nextDay,
  getCount,
} from '../../database/firestore';
import {getData, storeData, getAllData, getIntData} from '../../database/async';
import {SECOND} from '../../i18n/msg';

const Timer_Templates = () => {
  const user = auth().currentUser;
  const [count, setCounts] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [stop, setStop] = useState(false);
  const [email, setEmail] = useState('');
  const [acount, setaCount] = useState(count);
  const [asyncToday, setToday] = useState();

  useEffect(() => {
    getCount(user.email, setCounts);
    getData('Date', setToday);
    getAllData();
  }, []);
  console.log('count', count);

  useEffect(() => {
    console.log(count);
    //count 업데이트 되면 map object 업데이트해주기
    if (count == 0) {
      storeData('Date', today); //async strage 저장
    } else {
      // storeData('Count', count.toString());
      delDates(user.email, {count: count - 1, date: today}); //이전 count data삭제
      setDates(user.email, {count: count, date: today}); //새로운 count값 data추가
    }
  }, [count]);

  return (
    <View style={styles_templates.screen}>
      <View style={styles_templates.flex1}>
        <ModalButton
          visible={modalVisible}
          turnVisible={() => setModalVisible(!modalVisible)}
        />
      </View>
      <Instruction
        visible={modalVisible}
        turnVisible={() => setModalVisible(!modalVisible)}
      />

      <View style={styles_templates.flex3}>
        {/* sec: 기준 시간 현재 완료 값, setCount 전달*/}
        <Timer sec={SECOND} cnt={count} addCount={() => setCounts(count + 1)} />
      </View>
      <View style={styles_templates.flex1}>
        <Text style={styles_templates.text}>{`${count} 번 완료`}</Text>
      </View>
    </View>
  );
};
export default Timer_Templates;
