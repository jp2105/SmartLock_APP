import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Login from '../Components/Login'

const Navigation = (props) => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                headerMode={'none'}
            >
                <Stack.Screen name={'login'} component={Login}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;