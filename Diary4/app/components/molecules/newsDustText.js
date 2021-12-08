import {conformsTo} from 'lodash';
import React from 'react';
import {View, Text} from 'react-native';
import {BAD, GOOD, NEWS_UNIT, NORMAL, VERY_BAD} from '../../i18n/msg';
import styles_molecules from './styles_molecules';
const NewsDustText = props => {
  console.log('props level', props.level);
  let content;
  const levelArray = ['좋음', '보통', '나쁨', '매우나쁨'];

  return (
    <View style={styles_molecules.contentView_}>
      <View style={{flex: 0.8}}>
        <Text style={styles_molecules.mainText}>{props.title}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        {props.level == 0 && (
          <Text
            style={[styles_molecules.emoticonText, styles_molecules.blueText]}>
            {GOOD}
          </Text>
        )}
        {props.level == 1 && (
          <Text
            style={[styles_molecules.emoticonText, styles_molecules.redText]}>
            {NORMAL}
          </Text>
        )}
        {props.level == 2 && (
          <Text
            style={[styles_molecules.emoticonText, styles_molecules.redText]}>
            {BAD}
          </Text>
        )}
        {props.level == 3 && (
          <Text
            style={[styles_molecules.emoticonText, styles_molecules.redText]}>
            {VERY_BAD}
          </Text>
        )}
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{fontSize: 20}}>{props.amount}</Text>
        <Text style={{fontSize: 20}}>{NEWS_UNIT}</Text>
      </View>
    </View>
  );
};

export default NewsDustText;
