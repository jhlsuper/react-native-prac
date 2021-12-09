import {StyleSheet} from 'react-native';
import React from 'react';
import {BLUE_TEXT, MAIN_BACKGROUND, RED_TEXT} from '../../i18n/msg';

export default styles_organisms = StyleSheet.create({
  flex1: {
    flex: 2.5,
    marginTop: 60,
  },

  /// timer ///
  timecontainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },

  textWhite75: {
    fontSize: 75,
    color: 'white',
  },
  count_text: {
    marginTop: 10,
  },
  press: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center',
  },
  btnText: {
    marginTop: 5,
    color: 'white',
    fontSize: 20,
  },
  //news
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
    color: RED_TEXT,
  },
  blueText: {
    color: BLUE_TEXT,
  },
  grayText: {
    // color: '#808080',
    color: 'lightgray',
  },
  covidContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
  },
  newsContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: MAIN_BACKGROUND,
    // backgroundColor: '#eee',
    height: '100%',
    padding: 10,
  },
  dustContainer: {
    flexDirection: 'column',
    flex: 1.2,
    padding: 10,
  },
  emoticonText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  flex7: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  //ranking
  flexrow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /// item
  item: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  email: {
    fontSize: 30,
  },
  //mypage
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    margin: 20,
  },
});
