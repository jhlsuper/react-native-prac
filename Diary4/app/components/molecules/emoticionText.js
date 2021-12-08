import React from 'react';
import {View, Text} from 'react-native';
import {BAD, GOOD, NORMAL, VERY_BAD} from '../../i18n/msg';
import styles_organisms from '../organisms/styles_organisms';

const EmoticionText = props => {
  return (
    <View style={{alignItems: 'center', paddingTop: 8}}>
      {props.dust.fineDustLevel == 0 && (
        <Text
          style={[styles_molecules.emoticonText, styles_molecules.blueText]}>
          {GOOD}
        </Text>
      )}
      {props.dust.fineDustLevel == 1 && (
        <Text style={[styles_molecules.emoticonText, styles_molecules.redText]}>
          {NORMAL}
        </Text>
      )}
      {props.dust.fineDustLevel == 2 && (
        <Text style={[styles_molecules.emoticonText, styles_molecules.redText]}>
          {BAD}
        </Text>
      )}
      {props.dust.fineDustLevel == 3 && (
        <Text style={[styles_molecules.emoticonText, styles_molecules.redText]}>
          {VERY_BAD}
        </Text>
      )}
    </View>
  );
};

export default EmoticionText;
