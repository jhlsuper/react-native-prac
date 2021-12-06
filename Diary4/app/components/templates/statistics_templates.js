import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import _, {forEach} from 'underscore';
import auth from '@react-native-firebase/auth';
import UserInfo from '../../components/molecules/userInfo';
import TitleText from '../molecules/titleText';
import styles_templates from './styles_templates';

import Graph from '../molecules/graph';
const Statistics_Templates = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const loggedEmail = user.email;
  const [totalTime, setTotalTime] = useState(0);
  const [mostRecent, setMostRecent] = useState();
  const user = auth().currentUser; //사용자
  const loggedEmail = user.email; //사용자 이메일

  useEffect(() => {
    fetchData(loggedEmail);
  }, []);
  const fetchData = async email => {
    try {
      const list = [];
      let temp = 0;
      firestore()
        .collection('users')
        .doc(email)
        .get()
        .then(querySnapshot => {
          const {data} = querySnapshot.data();
          data.forEach(item => {
            console.log('item', item);
            temp += item.count; //총 집중시간 계산
            list.push({date: item.date, count: item.count});
          });
          console.log('list', list);
          console.log(temp);
          setTotalTime(temp); //총 집중 횟수 저장
          setUserData(list); //날짜, 집중횟수 data저장
          const lastFocusCount = list[list.length - 1].count;
          if (lastFocusCount != 0) {
            setMostRecent(list[list.length - 1].date); //가장최근 공부한 날 저장
          } else {
            setMostRecent('아직 없습니다');
          }
          // console.log('userData', userData);
        });
      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const timesaDay = [
    // userData 형식
    {date: '2021-11-02', count: 1},
    {date: '2021-11-03', count: 2},
  ];

  if (loading) {
    return (
      <View style={styles_templates.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View style={styles_templates.container}>
        <TitleText title={'사용자 통계'} />
        <View style={styles_templates.infoContainer}>
          <UserInfo total={totalTime * 10} recent={mostRecent} />
        </View>
        <View style={styles_templates.graphContainer}>
          <Graph userData={userData} />
        </View>
      </View>
    );
  }
};

export default Statistics_Templates;
