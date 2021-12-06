import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles_molecules from './styles_molecules';

const TitleText = props => {
  return <Text style={styles_molecules.titleText}>{props.title}</Text>;
};

export default TitleText;
