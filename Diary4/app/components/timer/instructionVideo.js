import React from 'react';
import YouTube from 'react-native-youtube';
import {StyleSheet, View, Button} from 'react-native';
const InstructionVideo = () => {
  return (
    <YouTube //youtube player
      videoId="sbTz3lWrItk"
      apiKey="YOUR_YOUTUBE_DEVELOPER_API_KEY_FOR_ANDROID"
      play={true}
      fullscreen={false}
      loop={false}
      onReady={e => console.log('onReady')}
      onChangeState={e => console.log('onChangeState:', e.state)}
      onChangeQuality={e => console.log('onChangeQuality: ', e.quality)}
      onError={e => console.log('onError: ', e.error)}
      style={{width: '100%', height: 300}}
    />
  );
};

const styles = StyleSheet.create({});

export default InstructionVideo;
