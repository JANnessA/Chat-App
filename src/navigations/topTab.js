import React, {useContext, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import StackChat from './stackChat';
import StackContact from './stackContact';
import StackProfile from './stackProfile';
import {SocketEvent} from '../configs';
import Context from '../helpers/context';

const Tab = createMaterialTopTabNavigator();

export default function TopTab({navigation, route}) {
  const {socket} = useContext(Context);

  useEffect(() => {
    socket.on(SocketEvent.START_CALL, data => {
      navigation.navigate({
        name: 'Call',
        params: data,
      });
    });
    return () => {
      socket.off(SocketEvent.START_CALL);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Chat"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarLabelStyle: {fontSize: 15},
        tabBarStyle: {backgroundColor: '#143375'},
      }}>
      <Tab.Screen
        name="StackChat"
        component={StackChat}
        options={{tabBarLabel: 'Chat'}}
      />
      <Tab.Screen
        name="StackContact"
        component={StackContact}
        options={{tabBarLabel: 'Contact'}}
      />
      <Tab.Screen
        name="StackProfile"
        component={StackProfile}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
}
