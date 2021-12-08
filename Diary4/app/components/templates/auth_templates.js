import React, {useState, Component} from 'react';
import {View, ScrollView, ActivityIndicator, StyleSheet} from 'react-native';
import AuthForm from '../organisms/authForm';
import LogoComponent from '../molecules/logoImage';
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

export default Auth_Templates;
