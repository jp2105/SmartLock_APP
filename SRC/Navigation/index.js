import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React,{useEffect,useState} from 'react';

import Login from '../Components/Login';
import Home from '../Components/Home';
import Profile from '../Components/Profile';

const Navigation = props => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name={'login'} component={Login} />
        <Stack.Screen name={'home'} component={Home} />
        <Stack.Screen name={'profile'} component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
