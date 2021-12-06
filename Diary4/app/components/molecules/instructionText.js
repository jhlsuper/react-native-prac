import {Text} from 'react-native';
import React, {useState} from 'react';
import {INSTRUCTION_TEXT1} from '../../i18n/msg';
const InstructionText = props => {
  return <Text style={styles_molecules.instructionText}>{props.text}</Text>;
};

export default InstructionText;
