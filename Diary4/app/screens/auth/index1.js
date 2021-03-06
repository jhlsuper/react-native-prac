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

const AuthComponent = props => {
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

export default AuthComponent;
