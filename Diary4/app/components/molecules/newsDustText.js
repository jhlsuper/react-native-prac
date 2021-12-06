import React from 'react';
import {View, Text} from 'react-native';
import styles_molecules from './styles_molecules';
const NewsDustText = props => {
  return (
    <View style={styles_molecules.contentView_}>
      <View style={{flex: 0.8}}>
        <Text style={styles_molecules.mainText}>{props.title}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        {(props.level === '좋음') | (props.level === '보통') ? (
          <Text
            style={[styles_molecules.emoticonText, styles_molecules.blueText]}>
            {props.level}
          </Text>
        ) : (
          <Text
            style={[styles_molecules.emoticonText, styles_molecules.redText]}>
            {props.level}
          </Text>
        )}
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{fontSize: 20}}>{props.amount}</Text>
        <Text style={{fontSize: 20}}>µg/m3</Text>
      </View>
    </View>
  );
};

export default NewsDustText;
