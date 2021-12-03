import React, {useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import InstructionVideo from './instructionVideo';
const Instruction = props => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.visible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{inst}</Text>
          <InstructionVideo />
          <View style={styles.textContainer}>
            <Text>사용법</Text>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                1. 타이머를 시작하고 10분동안 완전히 집중한다.
              </Text>
              <Text style={styles.instructionText}>
                2. 10분동안 3번 총 30분을 집중하고 5분 휴식한다.
              </Text>
              <Text style={styles.instructionText}>
                3. 하루하루 총 집중하는 시간을 늘려간다.
              </Text>
              <Text style={styles.instructionText}>
                * 다른 어플을 사용하면 시간이 카운팅되지 않습니다.*
              </Text>
            </View>

            <Text>{'\n\n화이팅!!!'}</Text>
          </View>
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
  textContainer: {
    backgroundColor: 'lightgray',
    alignItems: 'center',
    // borderTopColor: 'black',
    // borderTopWidth: 1,
    margin: 10,
    padding: 10,
    shadowColor: 'gray',
  },
  instructionContainer: {
    alignItems: 'flex-start',
  },
  instructionText: {
    fontSize: 15,
    margin: 5,
  },
});
const inst = '10분 공부법이란? ';
export default Instruction;
