import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import YouTube from 'react-native-youtube';
// import {YouTubeStandaloneIOS} from 'react-native-youtube';
import Video from 'react-native-video';
// import Video2 from './video';
const Instruction = props => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.visible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{inst}</Text>
          {/* <Video2 /> */}
          <Pressable onPress={() => props.turnVisible()}>
            <Text>Hide Modal</Text>
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
});
const inst = '10분 공부법이란? ';
export default Instruction;
