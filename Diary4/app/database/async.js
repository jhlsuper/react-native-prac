import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback} from 'react';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getData = (key, fun) => {
  try {
    AsyncStorage.getItem(key).then(value => {
      if (value != null) {
        fun(value);
      }
    });
  } catch (error) {
    console.log('getData', error);
  }
};

export const getIntData = (key, fun) => {
  try {
    AsyncStorage.getItem(key).then(value => {
      if (value != null) {
        fun(parseInt(value));
      }
    });
  } catch (error) {
    console.log('getData', error);
  }
};

export const getAllData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    console.log('asycn stroage', result);
  } catch (error) {
    console.log('getAll', error);
  }
};
