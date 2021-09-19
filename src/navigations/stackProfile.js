import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Profile from '../screens/main/Profile';
import EditProfile from '../screens/main/EditProfile';

const Stack = createStackNavigator();
export default function StackProfile() {
  return (
    <Stack.Navigator initialRouteName={'Profile'}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
