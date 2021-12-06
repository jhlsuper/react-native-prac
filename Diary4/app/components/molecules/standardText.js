import React from 'react';
import {View, Text} from 'react-native';
import styles_molecules from './styles_molecules';
const StandardText = props => {
  return (
    <View
      style={{
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <Text style={styles_molecules.timeText}>{props.where}</Text>
      <Text style={styles_molecules.timeText}>{props.dateTime}</Text>
      <Text style={styles_molecules.timeText}> 기준 </Text>
    </View>
  );
};
export default StandardText;
