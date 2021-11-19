import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import phoneNumber from './components/phoneNumber';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Phone" component={phoneNumber} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
