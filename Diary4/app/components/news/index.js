import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {throwStatement} from '@babel/types';
import {SafeAreaView} from 'react-native-safe-area-context';
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
    nitrogenDioxide: 0, //이산화질소
    nitrogenDioxideLevel: '',
  });
  const [covidLoaded, setCovidLoaded] = useState(false);
  const [dustLoaded, setDustLoaded] = useState(false);
  const makeDustData = (item, data) => {
    let dustData;
    let value, level;

    for (let key in data) dustData = data[key];
    //console.log('dustData: ', dustData)

    value = dustData.body.items[0].seoul;

    if (item === 'PM10') {
      if (value <= 30) {
        level = '좋음';
      } else if (value > 30 && value <= 50) {
        level = '보통';
      } else if (value > 51 && value <= 100) {
        level = '나쁨';
      } else if (value > 101) {
        level = '매우나쁨';
      }

      setDust(prevData => ({
        ...prevData,
        dateTime: dustData.body.items[0].dataTime,
        fineDust: value,
        fineDustLevel: level,
      }));
    } else if (item === 'PM25') {
      if (value <= 15) {
        level = '좋음';
      } else if (value > 15 && value <= 25) {
        level = '보통';
      } else if (value > 25 && value <= 50) {
        level = '나쁨';
      } else if (value > 51) {
        level = '매우나쁨';
      }

      setDust(prevData => ({
        ...prevData,
        ultraFineDust: value,
        ultraFineDustLevel: level,
      }));
    } else if (item === 'NO2') {
      if (value <= 0.03) {
        level = '좋음';
      } else if (value > 0.03 && value <= 0.06) {
        level = '보통';
      } else if (value > 0.06 && value <= 0.2) {
        level = '나쁨';
      } else if (value > 0.2) {
        level = '매우나쁨';
      }

      setDust(prevData => ({
        ...prevData,
        nitrogenDioxide: value,
        nitrogenDioxideLevel: level,
      }));
    }
    setDustLoaded(true);
  };
  useEffect(() => {
    let today = formatDate().today;
    let yesterday = formatDate().yesterday;

    const requestCovid = axios({
      method: 'GET',
      url: `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=0C5aP5Fobx5FMuWckWfHEm78jK4lX7%2BYV%2F%2FfAObXYmqJMd2n6DyvlExAb1vZmGgmc6JJpxPOIcjBkIBrrBJVsA%3D%3D&pageNo=1&numOfRows=10&startCreateDt=${yesterday}&endCreateDt=${today}`,
    })
      .then(response => {
        makeCovidData(response.data);
      })
      .catch(e => console.log(e));

    const fineDust = ['PM10', 'PM25', 'NO2'];
    for (const item of fineDust) {
      const requestDust = axios({
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

  function addComma(num) {
    let regExp = /\B(?=(\d{3})+(?!\d))/g; //쉼표를 3자리수마다 찍어주는 정규표현식
    return num.toString().replace(regExp, ',');
  }

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
  function selectEmoticion() {
    const fineDustLevel = dust.fineDustLevel;
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
  // console.log('dust', {dust});
  if (covidLoaded && dustLoaded) {
    return (
      <SafeAreaView style={styles.newsContainer}>
        <View style={styles.covidContainer}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.titleText}># COVID -19</Text>
          </View>
          <View
            style={{
              flex: 0.7,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text style={styles.timeText}>{covid.dateTime}</Text>
            <Text style={styles.timeText}> 기준 </Text>
          </View>
          <View style={styles.contentView}>
            <View style={{flex: 1}}>
              <Text style={[styles.mainText]}>확진환자</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.mainText, styles.redText]}>
                {covid.confirmed}
              </Text>
            </View>
            {covid.confirmedDailyChange > 0 ? (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>▲ </Text>
                <Text style={{fontSize: 20}}>
                  {addComma(covid.confirmedDailyChange)}
                </Text>
              </View>
            ) : (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>▼ </Text>
                <Text style={{fontSize: 20}}>
                  {addComma(covid.confirmedDailyChange * -1)}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.contentView}>
            <View style={{flex: 1}}>
              <Text style={[styles.mainText]}>격리해제</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.mainText, styles.blueText]}>
                {addComma(covid.confirmedDailyChange)}
              </Text>
            </View>
            {covid.realeasedDailyChange > 0 ? (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>▲ </Text>
                <Text style={{fontSize: 20}}>
                  {addComma(covid.realeasedDailyChange)}
                </Text>
              </View>
            ) : (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>▼ </Text>
                <Text style={{fontSize: 20}}>
                  {addComma(covid.realeasedDailyChange * -1)}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.contentView}>
            <View style={{flex: 1}}>
              <Text style={[styles.mainText]}>사망자</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.mainText, styles.grayText]}>
                {covid.deceased}
              </Text>
            </View>
            {covid.deceasedDailyChange > 0 ? (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>▲ </Text>
                <Text style={{fontSize: 20}}>
                  {addComma(covid.deceasedDailyChange)}
                </Text>
              </View>
            ) : (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>▼ </Text>
                <Text style={{fontSize: 20}}>
                  {addComma(covid.deceasedDailyChange * -1)}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.contentView}>
            <View style={{flex: 1}}>
              <Text style={[styles.mainText]}>검사진행</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.mainText, styles.grayText]}>
                {covid.inProgress}
              </Text>
            </View>
            {covid.inProgressDailyChange > 0 ? (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>▲ </Text>
                <Text style={{fontSize: 20}}>
                  {addComma(covid.inProgressDailyChange)}
                </Text>
              </View>
            ) : (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>▼ </Text>
                <Text style={{fontSize: 20}}>
                  {addComma(covid.inProgressDailyChange * -1)}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.dustContainer}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.titleText}># 미세먼지</Text>
          </View>
          <View
            style={{
              flex: 0.7,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text style={styles.timeText}>서울 </Text>
            <Text style={styles.timeText}>{dust.dateTime}</Text>
            <Text style={styles.timeText}> 기준</Text>
          </View>
          <View style={{flex: 1.8, justifyContent: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={selectEmoticion()}
                // source={require('../../assets/images/very_good.png')}
                style={{width: 60, height: 60}}
                resizeMode="contain"
              />
            </View>
            <View style={{alignItems: 'center', paddingTop: 8}}>
              {(dust.fineDustLevel === '좋음') |
              (dust.fineDustLevel === '보통') ? (
                <Text style={[styles.emoticonText, styles.blueText]}>
                  {dust.fineDustLevel}
                </Text>
              ) : (
                <Text style={[styles.emoticonText, styles.redText]}>
                  {dust.fineDustLevel}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.contentView_}>
            <View style={{flex: 0.8}}>
              <Text style={styles.mainText}>미세먼지</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              {(dust.fineDustLevel === '좋음') |
              (dust.fineDustLevel === '보통') ? (
                <Text style={[styles.emoticonText, styles.blueText]}>
                  {dust.fineDustLevel}
                </Text>
              ) : (
                <Text style={[styles.emoticonText, styles.redText]}>
                  {dust.fineDustLevel}
                </Text>
              )}
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{fontSize: 20}}>{dust.fineDust}</Text>
              <Text style={{fontSize: 20}}>µg/m3</Text>
            </View>
          </View>
          <View style={styles.contentView_}>
            <View style={{flex: 0.8}}>
              <Text style={styles.mainText}>초미세먼지</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              {(dust.ultraFineDustLevel === '좋음') |
              (dust.ultraFineDustLevel === '보통') ? (
                <Text style={[styles.emoticonText, styles.blueText]}>
                  {dust.ultraFineDustLevel}
                </Text>
              ) : (
                <Text style={[styles.emoticonText, styles.redText]}>
                  {dust.ultraFineDustLevel}
                </Text>
              )}
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{fontSize: 20}}>{dust.ultraFineDust}</Text>
              <Text style={{fontSize: 20}}>µg/m3</Text>
            </View>
          </View>
          <View style={styles.contentView_}>
            <View style={{flex: 0.8}}>
              <Text style={styles.mainText}>이산화질소</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              {(dust.nitrogenDioxideLevel === '좋음') |
              (dust.nitrogenDioxideLevel === '보통') ? (
                <Text style={[styles.emoticonText, styles.blueText]}>
                  {dust.nitrogenDioxideLevel}
                </Text>
              ) : (
                <Text style={[styles.emoticonText, styles.redText]}>
                  {dust.nitrogenDioxideLevel}
                </Text>
              )}
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{fontSize: 20}}>{dust.nitrogenDioxide}</Text>
              <Text style={{fontSize: 20}}>ppm</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  newsContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#7487C5',
    // backgroundColor: '#eee',
    height: '100%',
    padding: 10,
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
    color: 'lightgray',
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
    // color: '#808080',
    color: 'lightgray',
  },
  emoticonText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    backgroundColor: '#7487C5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NewsComponent;
