import React from 'react';
import {View} from 'react-native';
import DateBeforeButton from '../molecules/dateBeforeButton';
import {monthBefore, weekBefore, today} from '../../database/firestore';
const DateBeforeButtonArray = props => {
  return (
    <View
      style={{
        flex: 1,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <DateBeforeButton
        text={'월'}
        index={0}
        before={monthBefore}
        resetDate={props.resetDate}
        colorArray={props.colorArray}
      />
      <DateBeforeButton
        text={'주'}
        index={1}
        before={weekBefore}
        resetDate={props.resetDate}
        colorArray={props.colorArray}
      />
      <DateBeforeButton
        text={'일'}
        index={2}
        before={today}
        resetDate={props.resetDate}
        colorArray={props.colorArray}
      />
    </View>
  );
};

export default DateBeforeButtonArray;
