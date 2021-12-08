import React, {useState, useEffect} from 'react';
import ModalButton from '../molecules/modalButton';
import Instruction from '../organisms/instruction';
import Timer from '../organisms/timer';
import {PermissionsAndroid, Text, View} from 'react-native';
import styles_templates from './styles_templates';
import auth from '@react-native-firebase/auth';
import CameraRoll from '@react-native-community/cameraroll';
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
  const [stop, setStop] = useState(false);
  const [count, setCounts] = useState(0);
  const [email, setEmail] = useState('');
  const [acount, setaCount] = useState(count);
  const [modalVisible, setModalVisible] = useState(false);
  const [asyncToday, setToday] = useState();

  const [data, setData] = '';
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const getGallary = () => {
    CameraRoll.getPhotos({
      first: 3,
      assetType: 'Photos',
    })
      .then(res => {
        // setData(res.edges);
        console.log(res.edges);
      })
      .catch(error => {
        console.log(error);
      });
  };

  console.log(data);
  useEffect(() => {
    getCount(user.email, setCounts);
    getData('Date', setToday);
    getAllData();
    // hasAndroidPermission();
    getGallary();
    // getData('email', setEmail);
  }, []);
  console.log('count', count);
  // console.log(asyncToday);
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
