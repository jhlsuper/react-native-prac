import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './components/home';
import RankingScreen from './components/ranking';
import MyPageScreen from './components/myPage';
import StatisticsScreen from './components/ statistics';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? require('./assets/images/home_ch.png')
                  : require('./assets/images/home_un.png');
              } else if (route.name === 'Ranking') {
                iconName = focused
                  ? require('./assets/images/ranking_ch.png')
                  : require('./assets/images/ranking_un.png');
              } else if (route.name === 'Statisctics') {
                iconName = focused
                  ? require('./assets/images/calendar_ch.png')
                  : require('./assets/images/calendar_un.png');
              } else if (route.name === 'MyPage') {
                iconName = focused
                  ? require('./assets/images/user_ch.png')
                  : require('./assets/images/user_un.png');
              }

              return (
                <Image source={iconName} style={{width: 25, height: 25}} />
              );
            },
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Ranking" component={RankingScreen} />
          <Tab.Screen name="Statisctics" component={StatisticsScreen} />
          <Tab.Screen name="MyPage" component={MyPageScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  bottom: {
    flexDirection: 'row',

    marginBottom: 20,

    justifyContent: 'space-evenly',
  },
  buttons: {
    flex: 1,
    alignItems: 'baseline',
  },
});
export default App;
