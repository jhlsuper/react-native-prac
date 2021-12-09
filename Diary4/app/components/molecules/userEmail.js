import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

import auth from '@react-native-firebase/auth';
import styles_molecules from './styles_molecules';
import {getData} from '../../database/async';
import {EMAIL} from '../../i18n/msg';

const UserEmail = () => {
  const [userEmail, setUser] = useState('');

  useEffect(() => {
    getData('userEmail', setUser);
  }, []);
  return (
    <View style={styles_molecules.container}>
      <Text style={styles_molecules.userInfoTxt}>
        {EMAIL}
        {userEmail}
      </Text>
    </View>
  );
};
export default UserEmail;
