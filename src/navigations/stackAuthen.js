import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MidAuthen from '../screens/authen/midAuthen';
import Login from '../screens/authen/Login';
import Register from '../screens/authen/Register';

const Stack = createStackNavigator();
export default function StackAuthen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MidAuthen"
        component={MidAuthen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
