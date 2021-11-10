import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  ScrollView,
} from 'react-native';
import AuthLogo from './authLogo';
import AuthForm from './authForm';
import {Component} from 'react';
class AuthComponent extends Component {
  state = {
    loading: false,
  };
  goWithoutLogin = () => {
    this.props.navigation.navigate('AppTabComponent');
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.container}>
          <View>
            <AuthLogo />
            <AuthForm goWithoutLogin={this.goWithoutLogin} />
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#7487C5',
    paddingTop: 130,
    paddingLeft: 50,
    paddingRight: 50,
  },
});

export default AuthComponent;
