import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddNotes from '../screens/AddNotes';
import AllNotes from '../screens/AllNotes';

const Stack = createNativeStackNavigator();
export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AllNotes"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="AllNotes" component={AllNotes} />
        <Stack.Screen
          name="AddNotes"
          component={AddNotes}
          options={{headerShown: true, title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
