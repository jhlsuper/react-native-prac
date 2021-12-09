import 'react-native-gesture-handler';
import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  ScrollView,
} from 'react-native';
import AuthLogo from './authLogo';
import AuthForm from './authForm';
// import AuthForm from '../../components/organisms/authForm';
import {Component} from 'react';
import Auth_Templates from '../../components/templates/auth_templates';

const AuthComponent = props => {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  goWithoutLogin = () => {
    props.navigation.navigate('AppTabComponent');
  };
  authUser = () => {
    authenticated = !authenticated;
  };
  // return <Auth_Templates />;
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  } else {
    if (authenticated) {
      goWithoutLogin();
    } else {
      return (
        <ScrollView style={styles.container}>
          <View>
            <AuthLogo />

            <AuthForm goWithoutLogin={goWithoutLogin} authUser={authUser} />
          </View>
        </ScrollView>
      );
    }
  }
};

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
