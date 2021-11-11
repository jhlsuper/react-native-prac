import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Alert,
  Pressable,
  Modal,
} from 'react-native';

const PopupButton = props => {
  return (
    <View stype={styles.container}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          props.turnVisible();
          console.log(props.visible);
        }}>
        <Text style={styles.textStyle}>10분 공부법 이란?</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    hadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    hadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PopupButton;
