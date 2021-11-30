import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {IconFill, IconOutline} from '@ant-design/icons-react-native';
//Screens

import SignIn from './components/auth';
import Timer from './components/timer';
import News from './components/news';
import Stats from './components/statistics';
import MyPage from './components/mypage';
import {sub} from 'react-native-reanimated';
import RankingComponent from './components/ranking';
import Icon from 'react-native-ionicons';
const AuthStack = createStackNavigator();
const MainScreenTab = createBottomTabNavigator();
// const bottomNavigationConfigs = {
//   ititialRouteName: 'Timer',
//   tobBarOptions: {
//     style: {height: 1000},
//   },
// };
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
    <MainScreenTab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'white',
        style: {backgroundColor: '#7487C5', color: 'whilte'},
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focuesd, color, size}) => {
          let iconName;
          if (route.name == 'Timer') {
            iconName = 'timer';
          } else if (route.name == 'News') {
            iconName = 'newspaper';
          } else if (route.name == 'Ranking') {
            iconName = 'trophy';
          } else if (route.name == 'Statiscs') {
            iconName = 'pie-chart';
          } else if (route.name == 'MyPage') {
            iconName = 'people';
          }
          return <Ionicons name={iconName} size={size} color={'white'} />;
        },
      })}>
      <MainScreenTab.Screen name="Timer" component={Timer} />
      <MainScreenTab.Screen name="News" component={News} />
      <MainScreenTab.Screen name="Ranking" component={RankingComponent} />
      <MainScreenTab.Screen name="Statiscs" component={Stats} />
      <MainScreenTab.Screen name="MyPage" component={MyPage} />
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
  // if (initializing) return null;

  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {user ? ( //isloggedin 이였다.
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
