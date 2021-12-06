import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles_molecules from './styles_molecules';

const DateBeforeButton = props => {
  return (
    <TouchableOpacity
      style={styles_molecules.buttonDate}
      onPress={() => props.resetDate(props.before, props.index)}>
      <Text
        style={{
          ...styles_molecules.buttonText,
          color: props.colorArray[props.index],
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default DateBeforeButton;
