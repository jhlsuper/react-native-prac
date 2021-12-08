import React from 'react';
import {Text, Pressable} from 'react-native';
import {MODAL_BUTTON_TEXT} from '../../i18n/msg';
import styles_molecules from './styles_molecules';
const ModalButton = props => {
  return (
    <Pressable
      style={[styles_molecules.button, styles_molecules.buttonOpen]}
      onPress={() => {
        props.turnVisible();
        console.log(props.visible);
      }}>
      <Text style={styles_molecules.modalTextStyle}>{MODAL_BUTTON_TEXT}</Text>
    </Pressable>
  );
};

export default ModalButton;
