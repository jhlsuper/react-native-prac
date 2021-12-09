import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {logOut} from '../../store/actions/user_actions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UserEmail from '../molecules/userEmail';
import styles_templates from './styles_templates';
import TitleText from '../molecules/titleText';
import LogOutButton from '../molecules/logoutButton';

const MyPage_Templates = () => {
  // Set an initializing state whilst Firebase connects
  const [data, setData] = useState('');
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const getGallary = () => {
    CameraRoll.getPhotos({
      first: 3,
      assetType: 'Photos',
    })
      .then(res => {
        // setData(res.edges);
        console.log(res.edges);
      })
      .catch(error => {
        console.log(error);
      });
  };
  // getGallary();
  return (
    <SafeAreaView style={styles_templates.container}>
      <TitleText title={'마이페이지'} />
      <UserEmail />

      <View style={styles_templates.bottom}>
        <LogOutButton text={'로그아웃'} />
      </View>
    </SafeAreaView>
  );
};

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
export default MyPage_Templates;
