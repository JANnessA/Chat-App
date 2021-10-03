import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Contact from '../screens/main/Contact';
import ChatDetail from '../screens/main/ChatDetail';
import Call from '../screens/main/Call';

const Stack = createStackNavigator();
export default function StackContact() {
  return (
    <Stack.Navigator initialRouteName={'Contact'}>
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
