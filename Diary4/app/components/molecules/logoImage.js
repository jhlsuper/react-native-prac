import React from 'react';
import {View, Image} from 'react-native';

import LogoImage from '../../assets/images/timer_logo.png';
import {LOGO_HEIGHT, LOGO_WIDTH} from '../../i18n/msg';

const LogoComponent = () => (
  <View style={{alignItems: 'center', marginBottom: 30}}>
    <Image
      source={LogoImage}
      resizeMode={'contain'} //view안에서 가로세로 비율을 유지하며 꽉채운다.
      style={{width: LOGO_WIDTH, height: LOGO_HEIGHT}}
    />
  </View>
);
export default LogoComponent;
