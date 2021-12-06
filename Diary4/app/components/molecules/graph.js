import React from 'react';
import {Dimensions} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import {todayLong} from '../../database/firestore';
import chartConfig from '../../utils/forms/charconfig';
const Graph = props => {
  return (
    <ContributionGraph
      //values={userData.length == 0 ? timesaDay : userData}
      values={props.userData}
      endDate={todayLong}
      numDays={90} //그래프 날짜 90일까지
      width={Dimensions.get('window').width}
      height={220}
      squareSize={22}
      gutterSize={1.5}
      chartConfig={chartConfig}
    />
  );
};
export default Graph;
