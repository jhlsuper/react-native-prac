import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CoivdData from '../organisms/covidData';
import DustData from '../organisms/dustData';
import styles_templates from './styles_templates';
import {requestCovidData, requestDustData} from '../../api/newsapi';
import {addComma} from '../../utils/forms/stringForms';
import {KOREA, SEOUL} from '../../i18n/msg';
function News_Templates() {
  const [covid, setCovid] = useState({
    dateTime: '',
    confirmed: 0, // 확진
    confirmedDailyChange: 0, //확진자 변화량
    released: 0, //격리하제
    realeasedDailyChange: 0,
    deceased: 0, //사망자
    deceasedDailyChange: 0,
    inProgress: 0, //검사진행
    inProgressDailyChange: 0,
  });
  const [dust, setDust] = useState({
    place: '서울',
    dateTime: '',
    fineDust: 0, //미세먼지
    fineDustLevel: '', //미세먼지 단계
    ultraFineDust: 0, //초미세먼지
    ultraFineDustLevel: '',
    nitrogenDioxide: 0, //이산화질소
    nitrogenDioxideLevel: '',
  });
  const [covidLoaded, setCovidLoaded] = useState(true);
  const [dustLoaded, setDustLoaded] = useState(false);

  useEffect(() => {
    requestCovidData(makeCovidData);
    requestDustData(makeDustData);
  }, []);

  makeCovidData = data => {
    let covidData;
    for (let key in data) {
      covidData = data[key];
      console.log('covid data', covidData);
    }
    let prevData = covidData.body.items.item[1];
    let currData = covidData.body.items.item[0];

    let covidCopy = covid;
    covidCopy.dateTime = currData.createDt;
    covidCopy.confirmed = addComma(currData.decideCnt); //확진환지
    covidCopy.released = addComma(currData.clearCnt); //격리해제
    covidCopy.deceased = addComma(currData.deathCnt); //사망자
    covidCopy.inProgress = addComma(currData.examCnt); // 검사 진행

    covidCopy.confirmedDailyChange = currData.decideCnt - prevData.decideCnt; //확진환자 변화량
    covidCopy.realeasedDailyChange = currData.clearCnt - prevData.clearCnt;
    covidCopy.deceasedDailyChange = currData.deathCnt - prevData.deathCnt;
    covidCopy.inProgressDailyChange = currData.examCnt - prevData.examCnt;
    setCovid(covidCopy);
    setCovidLoaded(true);
  };
  const makeDustData = (item, data) => {
    let dustData;
    let value, level;

    for (let key in data) {
      dustData = data[key];
    }
    value = dustData.body.items[0].seoul; //서울의 미세먼지 값을 불러옴
    console.log('value', value);
    if (item === 'PM10') {
      //미세먼지 값 분류
      //
      if (value <= 30) {
        level = 0;
      } else if (value > 30 && value <= 50) {
        level = 1;
      } else if (value > 51 && value <= 100) {
        level = 2;
      } else if (value > 101) {
        level = 3;
      }

      setDust(prevData => ({
        ...prevData,
        dateTime: dustData.body.items[0].dataTime,
        fineDust: value,
        fineDustLevel: level,
      }));
    } else if (item === 'PM25') {
      //초미세 먼지값 분류
      if (value <= 15) {
        level = 0;
      } else if (value > 15 && value <= 25) {
        level = 1;
      } else if (value > 25 && value <= 50) {
        level = 2;
      } else if (value > 51) {
        level = 3;
      }

      setDust(prevData => ({
        ...prevData,
        ultraFineDust: value,
        ultraFineDustLevel: level,
      }));
    } else if (item === 'NO2') {
      //이산화질소 값 분류
      if (value <= 0.03) {
        level = 0;
      } else if (value > 0.03 && value <= 0.06) {
        level = 1;
      } else if (value > 0.06 && value <= 0.2) {
        level = 2;
      } else if (value > 0.2) {
        level = 3;
      }

      setDust(prevData => ({
        ...prevData,
        nitrogenDioxide: value,
        nitrogenDioxideLevel: level,
      }));
    }
    setDustLoaded(true); //로딩완료
  };

  if (covidLoaded && dustLoaded) {
    return (
      <SafeAreaView style={styles_templates.newsContainer}>
        <CoivdData where={KOREA} covid={covid} />
        <DustData where={SEOUL} dust={dust} />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles_templates.loading}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
}

export default News_Templates;
