import React, {useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import InstructionVideo from '../molecules/instructionVideo';
import styles_molecules from '../molecules/styles_molecules';
import {
  CLOSE,
  FIGHTING,
  HOWTOUSE,
  INSTRUCTION_TEXT1,
  INSTRUCTION_TEXT2,
  INSTRUCTION_TEXT3,
  INSTRUCTION_TEXT4,
  MODAL_BUTTON_TEXT,
} from '../../i18n/msg';
import Instruction_Text from '../molecules/instructionText';
const Instruction = props => {
  return (
    <View style={styles_molecules.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.visible}>
        <View style={styles_molecules.modalView}>
          <Text style={styles_molecules.modalText}>{MODAL_BUTTON_TEXT}</Text>
          <InstructionVideo />
          <View style={styles_molecules.textContainer}>
            <Text>{HOWTOUSE}</Text>
            <View style={styles_molecules.instructionContainer}>
              <Instruction_Text text={INSTRUCTION_TEXT1} />
              <Instruction_Text text={INSTRUCTION_TEXT2} />
              <Instruction_Text text={INSTRUCTION_TEXT3} />
              <Instruction_Text text={INSTRUCTION_TEXT4} />
            </View>

            <Text>{FIGHTING}</Text>
          </View>
          <Pressable
            style={styles_molecules.pressable}
            onPress={() => props.turnVisible()}>
            <Text style={styles_molecules.text_btn}>{CLOSE}</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default Instruction;
