import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import _, {forEach} from 'underscore';
import auth from '@react-native-firebase/auth';
import UserInfo from '../../components/molecules/userInfo';
import TitleText from '../molecules/titleText';
import styles_templates from './styles_templates';
import {getStatisticsData} from '../../database/firestore';
import Graph from '../molecules/graph';
import {SafeAreaView} from 'react-native-safe-area-context';
const Statistics_Templates = () => {
  const user = auth().currentUser; //사용자
  const loggedEmail = user.email; //사용자 이메일

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTime, setTotalTime] = useState(0);
  const [mostRecent, setMostRecent] = useState();

  useEffect(() => {
    getStatisticsData(
      loggedEmail,
      setTotalTime,
      setUserData,
      setMostRecent,
      loading,
      setLoading,
    );
  }, []);

  if (loading) {
    return (
      <View style={styles_templates.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles_templates.container}>
        <TitleText title={'사용자 통계'} />
        <View style={styles_templates.infoContainer}>
          <UserInfo total={totalTime * 10} recent={mostRecent} />
        </View>
        <View style={styles_templates.graphContainer}>
          <Graph userData={userData} />
        </View>
      </SafeAreaView>
    );
  }
};

export default Statistics_Templates;
// const timesaDay = [
//     // userData 형식
//     {date: '2021-11-02', count: 1},
//     {date: '2021-11-03', count: 2},
//   ];