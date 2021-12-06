import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {throwStatement} from '@babel/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import NewsCOVIDText from '../molecules/newsCOVIDText';
import StandardText from '../molecules/standardText';
import TitleText from '../molecules/titleText';
import CoivdData from '../organisms/covidData';
import DustEmoticon from '../molecules/dustEmoticon';
import NewsDustText from '../molecules/newsDustText';
import DustData from '../organisms/dustData';
import styles_molecules from '../molecules/styles_molecules';
import styles_templates from './styles_templates';
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
  const fineDust = ['PM10', 'PM25', 'NO2'];
  useEffect(() => {
    let today = formatDate().today;
    let yesterday = formatDate().yesterday;

    const requestCovid = axios({
      //모듈화 필요
      //COVID 19공공 api get
      method: 'GET',
      url: `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=0C5aP5Fobx5FMuWckWfHEm78jK4lX7%2BYV%2F%2FfAObXYmqJMd2n6DyvlExAb1vZmGgmc6JJpxPOIcjBkIBrrBJVsA%3D%3D&pageNo=1&numOfRows=10&startCreateDt=${yesterday}&endCreateDt=${today}`,
    })
      .then(response => {
        makeCovidData(response.data);
      })
      .catch(e => console.log(e));

    for (const item of fineDust) {
      const requestDust = axios({
        //미세먼지 공공 api get
        method: 'GET',
        url: `http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst?itemCode=${item}&dataGubun=HOUR&pageNo=1&numOfRows=100&returnType=json&serviceKey=0C5aP5Fobx5FMuWckWfHEm78jK4lX7%2BYV%2F%2FfAObXYmqJMd2n6DyvlExAb1vZmGgmc6JJpxPOIcjBkIBrrBJVsA%3D%3D`,
      }).then(response => {
        makeDustData(item, response.data);
      });
    }
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
  function addComma(num) {
    let regExp = /\B(?=(\d{3})+(?!\d))/g; //쉼표를 3자리수마다 찍어주는 정규표현식
    return num.toString().replace(regExp, ',');
  }

  formatDate = () => {
    //오늘 값과  어제 저장  2021124 와같은 형식
    let todayDate = new Date();
    let today = calculateDate(todayDate);

    let yesterdayDate = new Date(Date.now() - 86400000); //현재에서 24시간전 의 시간
    let yesterday = calculateDate(yesterdayDate);
    let dateData = {today: today, yesterday: yesterday};
    return dateData;
  };
  calculateDate = date => {
    //date값을 20211124와 같은 형식으로 만듦.
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString(); //결과가 0~11이라
    let day = date.getDate().toString();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    let finalDate = `${year}${month}${day}`;
    return finalDate;
  };

  // console.log('dust', {dust});
  if (covidLoaded && dustLoaded) {
    return (
      <SafeAreaView style={styles_templates.newsContainer}>
        <CoivdData where={'대한민국'} covid={covid} />
        <DustData where={'서울'} dust={dust} />
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
