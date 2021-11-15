import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

//Screens

import SignIn from './components/auth';
import Timer from './components/timer';
import News from './components/news';
import Stats from './components/statistics';
import {sub} from 'react-native-reanimated';
const AuthStack = createStackNavigator();
const MainScreenTab = createBottomTabNavigator();

/*
   Stack Navigator
        -Stack Screen A
    
    Stack Navigator 
        - Tab Navigator
            -Tab Screen B - diary 
            -Tab Screen C - news
*/

const isLoggedIn = false;

const AppTabComponent = () => {
  return (
    <MainScreenTab.Navigator>
      <MainScreenTab.Screen name="Timer" component={Timer} />
      <MainScreenTab.Screen name="News" component={News} />
      <MainScreenTab.Screen name="Statiscs" component={Stats} />
    </MainScreenTab.Navigator>
  );
};

export const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subcsriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subcsriber;
  }, []);
  if (initializing) return null;

  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <AuthStack.Screen name="Main" component={AppTabComponent} />
      ) : (
        <>
          <AuthStack.Screen name="SignIn" component={SignIn} />
          <AuthStack.Screen
            name="AppTabComponent"
            component={AppTabComponent}
          />
        </>
      )}
    </AuthStack.Navigator>
  );
};
