import React from 'react';
import {View, Image} from 'react-native';

import LogoImage from '../../assets/images/timer_logo.png';

const LogoComponent = () => (
  <View style={{alignItems: 'center', marginBottom: 30}}>
    <Image
      source={LogoImage}
      resizeMode={'contain'} //view안에서 가로세로 비율을 유지하며 꽉채운다.
      style={{width: 300, height: 88}}
    />
  </View>
);
export default LogoComponent;
