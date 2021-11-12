import React, {useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import InstructionVideo from './instruction_video';
const Instruction = props => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.visible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{inst}</Text>
          <InstructionVideo />
          <Pressable
            style={styles.pressable}
            onPress={() => props.turnVisible()}>
            <Text style={styles.text_btn}>닫기</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: 'blue',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  pressable: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  text_btn: {
    fontSize: 20,
    color: 'white',
  },
});
const inst = '10분 공부법이란? ';
export default Instruction;
