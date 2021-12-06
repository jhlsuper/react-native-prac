import {StyleSheet} from 'react-native';
import React from 'react';

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
    color: '#C00000',
  },
  blueText: {
    color: '#0070C0',
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
    backgroundColor: '#7487C5',
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
});
