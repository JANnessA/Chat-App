import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StackAuthen from './src/navigations/stackAuthen';
import TopTab from './src/navigations/topTab';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StackAuthen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#143375',
            height: 80,
            shadowOpacity: 0,
            elevation: 0,
            fontFamily: 'GrechenFuemen-Regular',
          },
          headerTintColor: 'white',
          headerBackVisible: false,
        }}>
        <Stack.Screen
          name="StackAuthen"
          component={StackAuthen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TopTab"
          component={TopTab}
          options={{headerTitle: 'Chat App'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
