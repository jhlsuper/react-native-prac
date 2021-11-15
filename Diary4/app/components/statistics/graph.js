import React, {useState, useEffect} from 'react';
import {
  Button,
  TextInput,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {BarChart, ContributionGraph} from 'react-native-chart-kit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
function getUserDate(documentSnapShot) {
  return documentSnapShot.get('data');
}

const Graph = () => {
  //   const user = auth().currentUser;
  const user = async () =>
    await firestore().collection('users').doc('dlGg7roES3f69GJ1w7tP').get();
  //   console.log(JSON.stringify(user));
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
