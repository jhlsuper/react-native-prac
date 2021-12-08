import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import NewsCOVIDText from '../molecules/newsCOVIDText';
import TitleText from '../molecules/titleText';
import styles_organisms from './styles_organisms';
import StandardText from '../molecules/standardText';
import {
  CONFIRED,
  COVID_TITLE,
  DEATH,
  INPROGRESS,
  REALEASED,
} from '../../i18n/msg';
const CoivdData = props => {
  return (
    <View style={styles_organisms.covidContainer}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {/* <Text style={styles_organisms.titleText}># COVID -19</Text> */}
        <TitleText title={COVID_TITLE} />
      </View>
      <StandardText where={props.where} dateTime={props.covid.dateTime} />

      <NewsCOVIDText
        style={styles_organisms.redText}
        title={CONFIRED}
        confrimed={props.covid.confirmed}
        confirmedDailyChange={props.covid.confirmedDailyChange}
      />

      <NewsCOVIDText
        style={styles_organisms.blueText}
        title={REALEASED}
        confrimed={props.covid.released}
        confirmedDailyChange={props.covid.realeasedDailyChange}
      />

      <NewsCOVIDText
        style={styles_organisms.grayText}
        title={DEATH}
        confrimed={props.covid.deceased}
        confirmedDailyChange={props.covid.deceasedDailyChange}
      />

      <NewsCOVIDText
        style={styles_organisms.grayText}
        title={INPROGRESS}
        confrimed={props.covid.inProgress}
        confirmedDailyChange={props.covid.inProgressDailyChange}
      />
    </View>
  );
};
export default CoivdData;
