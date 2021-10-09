import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Contact from '../screens/main/Contact';
import ChatDetail from '../screens/main/ChatDetail';
import Call from '../screens/main/Call';
import FindFriend from '../screens/main/findFriend';
import FindFriendFromContact from '../screens/main/findFriendFromContact';

const Stack = createStackNavigator();
export default function StackContact() {
  return (
    <Stack.Navigator initialRouteName={'Contact'}>
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FindFriend"
        component={FindFriend}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FindFriendFromContact"
        component={FindFriendFromContact}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
