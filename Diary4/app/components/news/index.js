import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

function NewsComponent() {
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
        <View style={{flex: 1}}>
          <Text># 미세먼지</Text>
        </View>
        <View style={{flex: 0.7}}>
          <Text>서울</Text>
          <Text>mm.dd xx:xx</Text>
          <Text> 기준</Text>
        </View>
        <View>
          <View>
            <Image
              source={require('../../assets/images/very_good.png')}
              style={{width: 60, height: 60}}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text>좋음</Text>
          </View>
        </View>
        <View>
          <View>
            <Text>미세먼지</Text>
          </View>
          <View>
            <Text>좋음</Text>
          </View>
          <View>
            <Text>30</Text>
            <Text>µg/m3</Text>
          </View>
        </View>
        <View>
          <View>
            <Text>초미세먼지</Text>
          </View>
          <View>
            <Text>좋음</Text>
          </View>
          <View>
            <Text>15</Text>
            <Text>µg/m3</Text>
          </View>
        </View>
        <View>
          <View>
            <Text>이산화질소</Text>
          </View>
          <View>
            <Text>좋음</Text>
          </View>
          <View>
            <Text>0.027</Text>
            <Text>ppm</Text>
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
    color: '#7F&F&F',
  },
});

export default NewsComponent;
