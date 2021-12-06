import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  TextInput,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';
import _, {forEach} from 'underscore';
import auth from '@react-native-firebase/auth';
import chartConfig from '../../utils/forms/charconfig';
import UserInfo from '../../components/molecules/userInfo';
// const loggedEmail = user.email;

const Graph = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    //임시 data
    {date: '2021-11-02', count: 1},
    {date: '2021-11-03', count: 2},
    {date: '2021-11-04', count: 3},
    {date: '2021-11-05', count: 4},
    {date: '2021-11-06', count: 4},
    {date: '2021-11-15', count: 10},
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.text}>통계</Text> */}
        <View style={styles.infoContainer}>
          <UserInfo total={totalTime * 10} recent={mostRecent} />
        </View>
        <View style={styles.graphContainer}>
          <ContributionGraph
            //values={userData.length == 0 ? timesaDay : userData}
            values={userData}
            endDate={new Date()}
            numDays={90} //그래프 날짜 90일까지
            width={Dimensions.get('window').width}
            height={220}
            squareSize={22}
            gutterSize={1.5}
            chartConfig={chartConfig}
          />
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  graphContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 10,
    fontSize: 20,
    color: 'green',
  },
  titleText: {
    paddingTop: 10,
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default Graph;
