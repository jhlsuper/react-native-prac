import React, {useState, Component} from 'react';
import {View, ScrollView, ActivityIndicator, StyleSheet} from 'react-native';
import AuthForm from '../organisms/authForm';
import LogoComponent from '../molecules/logoImage';
import styles_templates from './styles_templates';
import LogoImage from '../molecules/logoImage';

const Auth_Templates = props => {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  goWithoutLogin = () => {
    props.navigation.navigate('AppTabComponent');
  };
  authUser = () => {
    authenticated = !authenticated;
  };

  if (loading) {
    return (
      <View style={styles_templates.loading}>
        <ActivityIndicator />
      </View>
    );
  } else {
    if (authenticated) {
      goWithoutLogin();
    } else {
      return (
        <ScrollView style={styles_templates.authcontainer}>
          <View>
            {/* <AuthLogo /> */}
            <LogoImage />

            <AuthForm goWithoutLogin={goWithoutLogin} authUser={authUser} />
          </View>
        </ScrollView>
      );
    }
  }
};

export default Auth_Templates;
