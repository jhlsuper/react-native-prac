import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {logOut} from '../../store/actions/user_actions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UserEmail from '../molecules/userEmail';
import styles_templates from './styles_templates';
import TitleText from '../molecules/titleText';
import FunctionButton from '../molecules/funtionButton';
import ProfileImage from '../organisms/profileImage';
const MyPage_Templates = () => {
  // Set an initializing state whilst Firebase connects

  // getGallary();
  return (
    <SafeAreaView style={styles_templates.container}>
      <TitleText title={'마이페이지'} />
      <ProfileImage />
      <UserEmail />

      <View style={styles_templates.bottom}>
        <FunctionButton text={'로그아웃'} function={logOut} />
      </View>
    </SafeAreaView>
  );
};

export default MyPage_Templates;
