import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import UserInfo from '../../components/molecules/userInfo';
import TitleText from '../molecules/titleText';
import styles_templates from './styles_templates';
import {getStatisticsData} from '../../database/firestore';
import Graph from '../molecules/graph';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingIndicator from '../molecules/loadingIndicator';
import {USER_STATISTICS} from '../../i18n/msg';
const Statistics_Templates = () => {
  const user = auth().currentUser; //사용자
  const loggedEmail = user.email; //사용자 이메일

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTime, setTotalTime] = useState(0);
  const [mostRecent, setMostRecent] = useState();
  console.log('statstat', userData);
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
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={styles_templates.container}>
        <TitleText title={USER_STATISTICS} />
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
