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

// const loggedEmail = user.email;

const Graph = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth().currentUser;
  const loggedEmail = user.email;
  const [totalTime, setTotalTime] = useState(0);
  const [mostRecent, setMostRecent] = useState();
  useEffect(() => {
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
              temp += item.count;
              list.push({date: item.date, count: item.count});
            });
            console.log('list', list);
            console.log(temp);
            setTotalTime(temp);
            setUserData(list);
            setMostRecent(list[list.length - 1].date);
            // console.log('userData', userData);
          });
        if (loading) {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData(loggedEmail);
  }, []);

  // console.log('user data', userData);

  const timesaDay = [
    {date: '2021-11-02', count: 1},
    {date: '2021-11-03', count: 2},
    {date: '2021-11-04', count: 3},
    {date: '2021-11-05', count: 4},
    {date: '2021-11-06', count: 4},
    {date: '2021-11-15', count: 10},
  ];
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(128,128,128,${opacity})`, //차트 색깔
    labelColor: (opacity = 1) => 'green', //달력 월 -색깔

    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    console.log(new Date());
    return (
      <View style={styles.container}>
        {/* <Text style={styles.text}>통계</Text> */}
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>
            총 집중한 시간 : {totalTime * 10} 분
          </Text>
          <Text style={styles.titleText}>
            가장 최근 공부한 날 : {mostRecent}
          </Text>
        </View>
        <View style={styles.graphContainer}>
          <ContributionGraph
            //values={userData.length == 0 ? timesaDay : userData}
            values={userData}
            endDate={new Date()}
            numDays={90}
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
