import React from 'react';
import {View, Text} from 'react-native';
import styles_organisms from '../organisms/styles_organisms';

const EmoticionText = props => {
  return (
    <View style={{alignItems: 'center', paddingTop: 8}}>
      {(props.dust.fineDustLevel === '좋음') |
      (props.dust.fineDustLevel === '보통') ? ( //좋음 이면 파란색글씨,보통이면 빨간색 글씨로 표시
        <Text
          style={[styles_organisms.emoticonText, styles_organisms.blueText]}>
          {props.dust.fineDustLevel}
        </Text>
      ) : (
        <Text style={[styles_organisms.emoticonText, styles_organisms.redText]}>
          {props.dust.fineDustLevel}
        </Text>
      )}
    </View>
  );
};

export default EmoticionText;
