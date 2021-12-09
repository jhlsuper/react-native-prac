import React from 'react';
import {View} from 'react-native';
import DateBeforeButton from '../molecules/dateBeforeButton';
import {monthBefore, weekBefore, today} from '../../utils/dates';
import {DAY, MONTH, WEEK} from '../../i18n/msg';
import styles_organisms from './styles_organisms';
const DateBeforeButtonArray = props => {
  return (
    <View style={styles_organisms.flexrow}>
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
