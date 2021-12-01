import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {logOut} from '../../store/actions/user_actions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MyPage from './mypage';
export default function MyPageCompnent() {
  // Set an initializing state whilst Firebase connects

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>마이 페이지</Text>
      <MyPage />
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Text style={styles.logoutText}>로그 아웃</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
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
