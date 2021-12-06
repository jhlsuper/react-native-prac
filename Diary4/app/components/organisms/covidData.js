import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import NewsCOVIDText from '../molecules/newsCOVIDText';
import TitleText from '../molecules/titleText';
import styles_organisms from './styles_organisms';
import StandardText from '../molecules/standardText';
const CoivdData = props => {
  return (
    <View style={styles_organisms.covidContainer}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {/* <Text style={styles_organisms.titleText}># COVID -19</Text> */}
        <TitleText title={'# COVID - 19'} />
      </View>
      <StandardText where={props.where} dateTime={props.covid.dateTime} />

      <NewsCOVIDText
        style={styles_organisms.redText}
        title={'확진환자'}
        confrimed={props.covid.confirmed}
        confirmedDailyChange={props.covid.confirmedDailyChange}
      />

      <NewsCOVIDText
        style={styles_organisms.blueText}
        title={'격리헤제'}
        confrimed={props.covid.released}
        confirmedDailyChange={props.covid.realeasedDailyChange}
      />

      <NewsCOVIDText
        style={styles_organisms.grayText}
        title={'사망자'}
        confrimed={props.covid.deceased}
        confirmedDailyChange={props.covid.deceasedDailyChange}
      />

      <NewsCOVIDText
        style={styles_organisms.grayText}
        title={'검사진행'}
        confrimed={props.covid.inProgress}
        confirmedDailyChange={props.covid.inProgressDailyChange}
      />
    </View>
  );
};
export default CoivdData;
