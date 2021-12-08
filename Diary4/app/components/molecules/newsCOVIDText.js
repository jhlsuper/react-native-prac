import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';
import styles_organisms from '../organisms/styles_organisms';
import addComma from '../../utils/forms/stringForms';
import {DOWN_TRIANGLE, UP_TRIANGLE} from '../../i18n/msg';
const NewsCOVIDText = props => {
  return (
    <View style={styles_organisms.contentView}>
      <View style={{flex: 1}}>
        <Text style={[styles_organisms.mainText]}>{props.title}</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={[styles_organisms.mainText, props.style]}>
          {props.confrimed}
        </Text>
      </View>
      {props.confirmedDailyChange > 0 ? ( //환진자가 전날보다 증가 or 감소에 따라 다른 삼각형 render
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{fontSize: 20}}>{UP_TRIANGLE}</Text>
          <Text style={{fontSize: 20}}>
            {/* {addComma(props.confirmedDailyChange)} */}
            {props.confirmedDailyChange}
          </Text>
        </View>
      ) : (
        // 음수값이기때문에 -1 곱해서 양수로 바꿔서 표시
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{fontSize: 20}}>{DOWN_TRIANGLE} </Text>
          <Text style={{fontSize: 20}}>
            {/* {addComma(props.confirmedDailyChange * -1)} */}
            {props.confirmedDailyChange}
          </Text>
        </View>
      )}
    </View>
  );
};

export default NewsCOVIDText;
