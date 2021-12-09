import React from 'react';
import {Text} from 'react-native';
import {logOut} from '../../store/actions/user_actions';
import styles_molecules from './styles_molecules';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FunctionButton = props => {
  return (
    <TouchableOpacity style={styles_molecules.button} onPress={props.function}>
      <Text style={styles_molecules.logoutText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default FunctionButton;
