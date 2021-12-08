import React from 'react';
import {Image} from 'react-native';
import {
  EMOTICION_BAD,
  EMOTICION_SIZE,
  EMOTICION_VERY_BAD,
  EMOTICON_GOOD,
  EMOTICON_VERYGOOD,
} from '../../i18n/msg';

const DustEmoticon = props => {
  function selectEmoticion() {
    // 미세먼지 단계에 따른 이모티콘
    const fineDustLevel = props.dust.fineDustLevel;
    let emoticonPath;
    console.log(fineDustLevel);
    switch (fineDustLevel) {
      case 0:
        emoticonPath = require('../../assets/images/very_good.png');
        return emoticonPath;
      case 1:
        emoticonPath = require('../../assets/images/good.png');
        return emoticonPath;
      case 2:
        emoticonPath = require('../../assets/images/bad.png');
        return emoticonPath;
      case 3:
        emoticonPath = require('../../assets/images/very_bad.png');
        return emoticonPath;
      default:
        emoticonPath = require('../../assets/images/very_good.png');
        return emoticonPath;
    }
  }
  return (
    <Image
      source={selectEmoticion()}
      // source={require('../../assets/images/very_good.png')}
      style={{width: EMOTICION_SIZE, height: EMOTICION_SIZE}}
      resizeMode="contain"
    />
  );
};

export default DustEmoticon;
