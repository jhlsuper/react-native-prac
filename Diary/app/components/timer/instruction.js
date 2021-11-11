import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import YouTube from 'react-native-youtube';
// import {YouTubeStandaloneIOS} from 'react-native-youtube';
const Instruction = props => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.visible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{inst}</Text>

          <YouTube
            videoId="SJ4NuL3WNL8&t=130s" // The YouTube video ID
            play // control playback of video with true/false
            fullscreen // control whether the video should play in fullscreen or inline
            loop // control whether the video should loop when ended
            onReady={e => this.setState({isReady: true})}
            onChangeState={e => this.setState({status: e.state})}
            onChangeQuality={e => this.setState({quality: e.quality})}
            onError={e => this.setState({error: e.error})}
            style={{alignSelf: 'stretch', height: 300}}
          />
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
