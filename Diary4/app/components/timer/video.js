import Video from 'react-native-video';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
const Video2 = () => {
  return (
    <View>
      <Video
        source={{uri: 'https://www.youtube.com/watch?v=SJ4NuL3WNL8&t=135s'}} // Can be a URL or a local file.
        ref={ref => {
          this.player = ref;
        }} // Store reference
        onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={this.videoError} // Callback when video cannot be loaded
        style={styles.backgroundVideo}
      />
      ;
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default Video2;
