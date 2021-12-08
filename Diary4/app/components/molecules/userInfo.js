import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {LASTEST_TIME, TOTAL_TIME} from '../../i18n/msg';
import styles_molecules from './styles_molecules';
///총 집중시간 , 가장최근 공부한 날
const UserInfo = props => {
  return (
    <View style={styles_molecules.infoContainer}>
      <Text style={styles_molecules.infoTitleText}>
        {TOTAL_TIME} {props.total}
      </Text>
      <Text style={styles_molecules.infoTitleText}>
        {LASTEST_TIME} {props.recent}
      </Text>
    </View>
  );
};

export default UserInfo;
