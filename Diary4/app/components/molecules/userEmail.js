import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

import auth from '@react-native-firebase/auth';
import styles_molecules from './styles_molecules';

const UserEmail = () => {
  const [userEmail, setUser] = useState('');

  useEffect(() => {
    setUser(auth().currentUser.email); //파이어베이스의 인증된 유저의 email값 불러오기
  }, []); //이거 async storage로 변환 하자.
  //text 로만 쓸지 고민.
  return (
    <View style={styles_molecules.container}>
      <Text style={styles_molecules.userInfoTxt}> 이메일 : {userEmail}</Text>
    </View>
  );
};
export default UserEmail;
