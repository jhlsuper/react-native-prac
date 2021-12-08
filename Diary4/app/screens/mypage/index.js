import React from 'react';
import {StyleSheet} from 'react-native';

import MyPage_Templates from '../../components/templates/mypage_templates';
export default function MyPageCompnent() {
  // Set an initializing state whilst Firebase connects

  return <MyPage_Templates />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7487C5',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  color: {
    alignContent: 'center',
    marginTop: 100,
    justifyContent: 'center',
  },
  titleText: {
    paddingTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  logoutText: {
    color: 'white',
  },
  button: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 7,
  },
});
