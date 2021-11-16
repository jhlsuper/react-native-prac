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
import {BarChart, ContributionGraph} from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';
import _, {forEach} from 'underscore';
import auth from '@react-native-firebase/auth';
import {set} from 'lodash';
import {not} from 'react-native-reanimated';
const user = auth().currentUser;
const loggedEmail = user.email;
const Graph = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const emptyList = [];
  useEffect(() => {
    const fetchData = async email => {
      try {
        const list = [];
        firestore()
          .collection('users')
          .doc(email)
          .get()
          .then(querySnapshot => {
            const {data, userEmail} = querySnapshot.data();
            data.forEach(item => {
              list.push(item);
            });
            console.log('list', list);
            setUserData(list);
            console.log('userData', userData);
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

  console.log('user finished data', userData);
  // userData.forEach(item => {
  //   emptyList.push(item);
  // });
  console.log('empty list', emptyList);

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
  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // } else {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>통계</Text>
      <ContributionGraph
        values={timesaDay}
        endDate={new Date()}
        numDays={90}
        width={Dimensions.get('window').width}
        height={220}
        squareSize={22}
        gutterSize={1.5}
        chartConfig={chartConfig}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 10,
    fontSize: 20,
    color: 'green',
  },
});
export default Graph;
