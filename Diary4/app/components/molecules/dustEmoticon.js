import React from 'react';
import {Image} from 'react-native';

const DustEmoticon = props => {
  function selectEmoticion() {
    // 미세먼지 단계에 따른 이모티콘
    const fineDustLevel = props.dust.fineDustLevel;
    let emoticonPath;
    switch (fineDustLevel) {
      case '좋음':
        emoticonPath = require('../../assets/images/very_good.png');
        return emoticonPath;
      case '보통':
        emoticonPath = require('../../assets/images/good.png');
        return emoticonPath;
      case '나쁨':
        emoticonPath = require('../../assets/images/bad.png');
        return emoticonPath;
      case '매우나쁨':
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
      style={{width: 60, height: 60}}
      resizeMode="contain"
    />
  );
};

export default DustEmoticon;
