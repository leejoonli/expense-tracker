import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable, Button } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import test from './components/testcomponent/test';
import ExpenseDetail from './components/ExpenseDetail/ExpenseDetail';
import ExpenseEdit from './components/ExpenseEdit/ExpenseEdit';
import axios from 'axios';

export default function App() {
  // call function to use Stack.Navigator
  const Stack = createNativeStackNavigator();

  // use navigator to navigate to different components (similar to react router routes/paths)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ title: 'Welcome' }} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='test' component={test} />
        <Stack.Screen name='ExpenseDetail' component={ExpenseDetail} />
        <Stack.Screen name='ExpenseEdit' component={ExpenseEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   testtext: {
//     border: '1px solid red',
//     flex: 1,
//   },
// });
