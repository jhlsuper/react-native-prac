import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getUserProfileImage, setProfileImage} from '../../database/firestore';
import {getData} from '../../database/async';
import styles_organisms from './styles_organisms';
import styles_templates from '../templates/styles_templates';
import FunctionButton from '../molecules/funtionButton';
import {hasAndroidPermission} from '../../utils/permissions';
const ProfileImage = () => {
  const [photoUri, setUri] = useState('');
  const [userEmail, setEmail] = useState('');
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    getData('userEmail', setEmail);
    console.log('userEmail', userEmail);
  }, []);

  useEffect(() => {
    // hasAndroidPermission();
    getUserProfileImage(userEmail, setUri);
    console.log('getUserProfile', userEmail);
  }, [userEmail]);

  const getPhoto = () => {
    getData('email', setEmail);
    launchImageLibrary({selectionLimit: 1}, response => {
      //   console.log(response.assets[0].uri);
      setUri(response.assets[0].uri);
      setProfileImage(userEmail, response.assets[0].uri);
      //   getUserProfileImage(userEmail, setUri);
    });
  };

  return (
    <View style={styles_templates.container}>
      {photoUri == '' ? (
        <Image
          source={require('../../assets/images/good.png')}
          style={styles_organisms.logo}
        />
      ) : (
        <Image source={{uri: photoUri}} style={styles_organisms.logo} />
      )}
      <FunctionButton text={'프로필 사진 지정'} function={getPhoto} />
    </View>
  );
};

export default ProfileImage;
