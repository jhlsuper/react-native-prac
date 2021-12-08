import React from 'react';
import {View} from 'react-native';
import DateBeforeButton from '../molecules/dateBeforeButton';
import {monthBefore, weekBefore, today} from '../../database/firestore';
import {DAY, MONTH, WEEK} from '../../i18n/msg';
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
        text={MONTH}
        index={0}
        before={monthBefore}
        resetDate={props.resetDate}
        colorArray={props.colorArray}
      />
      <DateBeforeButton
        text={WEEK}
        index={1}
        before={weekBefore}
        resetDate={props.resetDate}
        colorArray={props.colorArray}
      />
      <DateBeforeButton
        text={DAY}
        index={2}
        before={today}
        resetDate={props.resetDate}
        colorArray={props.colorArray}
      />
    </View>
  );
};

export default DateBeforeButtonArray;
