import React from 'react';
import {Dimensions} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import {todayLong} from '../../database/firestore';
import {
  GRAPH_DAYS,
  GRAPH_HEIGHT,
  GRAPH_SQUARESIZE,
  GUTTERSIZE,
} from '../../i18n/msg';
import chartConfig from '../../utils/forms/charconfig';
const Graph = props => {
  return (
    <ContributionGraph
      //values={userData.length == 0 ? timesaDay : userData}
      values={props.userData}
      endDate={todayLong}
      numDays={GRAPH_DAYS} //그래프 날짜 90일까지
      width={Dimensions.get('window').width}
      height={GRAPH_HEIGHT}
      squareSize={GRAPH_SQUARESIZE}
      gutterSize={GUTTERSIZE}
      chartConfig={chartConfig}
    />
  );
};
export default Graph;
