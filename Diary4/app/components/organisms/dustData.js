import React from 'react';
import {View, Text} from 'react-native';
import TitleText from '../molecules/titleText';
import styles_organisms from './styles_organisms';
import DustEmoticon from '../molecules/dustEmoticon';
import StandardText from '../molecules/standardText';
import NewsDustText from '../molecules/newsDustText';
import EmoticionText from '../molecules/emoticionText';
const DustData = props => {
  return (
    <View style={styles_organisms.dustContainer}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {/* <Text style={styles_organisms.titleText}># 미세먼지</Text> */}
        <TitleText title={'# 미세먼지'} />
      </View>
      <View
        style={{
          flex: 0.7,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <StandardText where={props.where} dateTime={props.dust.dateTime} />
      </View>

      <View style={{flex: 1.8, justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <DustEmoticon dust={props.dust} />
        </View>
        <EmoticionText dust={props.dust} />
      </View>
      <NewsDustText
        title={'미세먼지'}
        amount={props.dust.fineDust}
        level={props.dust.fineDustLevel}
      />

      <NewsDustText
        title={'초미세먼지'}
        amount={props.dust.ultraFineDust}
        level={props.dust.ultraFineDustLevel}
      />
      <NewsDustText
        title={'이산화질소'}
        amount={props.dust.nitrogenDioxide}
        level={props.dust.nitrogenDioxideLevel}
      />
    </View>
  );
};
export default DustData;
