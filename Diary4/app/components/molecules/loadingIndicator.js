import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles_templates from '../templates/styles_templates';
const LoadingIndicator = () => {
  return (
    <View style={styles_templates.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingIndicator;
