import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Chat from '../screens/main/Chat';
import ChatDetail from '../screens/main/ChatDetail';
import Call from '../screens/main/Call';

const Stack = createStackNavigator();
export default function StackChat() {
  return (
    <Stack.Navigator initialRouteName={'Chat'}>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Call"
        component={Call}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
