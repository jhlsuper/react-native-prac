import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import axios from 'axios';
function NewsComponent() {
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
    nitrogneDioxide: 0, //이산화질소
    nitrogneDioxideLevle: '',
  });
  useEffect(() => {
    let today = formatDate().today;
    let yesterday = formatDate().yesterday;
    const requestCovid = axios({
      method: 'GET',
      url: `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=0C5aP5Fobx5FMuWckWfHEm78jK4lX7%2BYV%2F%2FfAObXYmqJMd2n6DyvlExAb1vZmGgmc6JJpxPOIcjBkIBrrBJVsA%3D%3D
      &pageNo=1&numOfRows=10&startCreateDt=${yesterday}&endCreateDt=${today}`,
    })
      .then(response => {
        makeCovidData(response.data);
      })
      .catch(e => console.log(e));
  }, []);

  makeCovidData = data => {
    let covideData;
    console.log('covid Data', data);
  };

  formatDate = () => {
    let todayDate = new Date();
    let today = calculateDate(todayDate);

    let yesterdayDate = new Date(Date.now() - 86400000); //현재에서 24시간전 의 시간
    let yesterday = calculateDate(yesterdayDate);
    let dateData = {today: today, yesterday: yesterday};
    return dateData;
  };
  calculateDate = date => {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString(); //결과가 0~11이라
    let day = date.getDate().toString();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    let finalDate = `${year}${month}${day}`;
    return finalDate;
  };

  return (
    <View style={styles.newsContainer}>
      <View style={styles.covidContainer}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.titleText}># COVID -19</Text>
        </View>
        <View
          style={{
            flex: 0.7,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={styles.timeText}>mm.dd. xx:xx</Text>
          <Text style={styles.timeText}>기준 </Text>
        </View>
        <View style={styles.contentView}>
          <View style={{flex: 1}}>
            <Text style={[styles.mainText]}>확진환자</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.mainText, styles.redText]}>10000</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{fontSize: 20}}>▲450</Text>
          </View>
        </View>
        <View style={styles.contentView}>
          <View style={{flex: 1}}>
            <Text style={[styles.mainText]}>격리해제</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.mainText, styles.blueText]}>5000</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{fontSize: 20}}>▲260</Text>
          </View>
        </View>
        <View style={styles.contentView}>
          <View style={{flex: 1}}>
            <Text style={[styles.mainText]}>사망자</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.mainText, styles.grayText]}>400</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{fontSize: 20}}>▲0</Text>
          </View>
        </View>
        <View style={styles.contentView}>
          <View style={{flex: 1}}>
            <Text style={[styles.mainText]}>검사진행</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.mainText, styles.grayText]}>1500</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{fontSize: 20}}>▲0</Text>
          </View>
        </View>
      </View>
      <View style={styles.dustContainer}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.titleText}># 미세먼지</Text>
        </View>
        <View
          style={{
            flex: 0.7,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={styles.timeText}>서울</Text>
          <Text style={styles.timeText}>mm.dd xx:xx</Text>
          <Text> 기준</Text>
        </View>
        <View style={{flex: 1.8, justifyContent: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/very_good.png')}
              style={{width: 60, height: 60}}
              resizeMode="contain"
            />
          </View>
          <View style={{alignItems: 'center', paddingTop: 8}}>
            <Text style={(styles.emoticonText, styles.blueText)}>좋음</Text>
          </View>
        </View>
        <View style={styles.contentView_}>
          <View style={{flex: 0.8}}>
            <Text style={styles.mainText}>미세먼지</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={(styles.mainText, styles.blueText)}>좋음</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{fontSize: 20}}>30</Text>
            <Text style={{fontSize: 20}}>µg/m3</Text>
          </View>
        </View>
        <View style={styles.contentView_}>
          <View style={{flex: 0.8}}>
            <Text style={styles.mainText}>초미세먼지</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={(styles.mainText, styles.blueText)}>좋음</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{fontSize: 20}}>15</Text>
            <Text style={{fontSize: 20}}>µg/m3</Text>
          </View>
        </View>
        <View style={styles.contentView_}>
          <View style={{flex: 0.8}}>
            <Text style={styles.mainText}>이산화질소</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={(styles.mainText, styles.blueText)}>좋음</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{fontSize: 20}}>0.027</Text>
            <Text style={{fontSize: 20}}>ppm</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  newsContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eee',
    height: '100%',
    padding: 10,
    // alignContent: 'center',
    // justifyContent: 'center',
  },
  color: {
    backgroundColor: 'gray',
  },
  covidContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
  },
  dustContainer: {
    flexDirection: 'column',
    flex: 1.2,
    padding: 10,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 17,
    color: 'gray',
  },
  contentView: {
    flex: 0.7,
    flexDirection: 'row',
    paddingLeft: 20,
    alignContent: 'center',
  },
  contentView_: {
    flex: 0.7,
    flexDirection: 'row',
    paddingLeft: 20,
    alignContent: 'center',
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  redText: {
    color: '#C00000',
  },
  blueText: {
    color: '#0070C0',
  },
  grayText: {
    color: '#808080',
  },
  emoticonText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default NewsComponent;
