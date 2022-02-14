import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable, Button } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import test from './components/testcomponent/test';
import axios from 'axios';

export default function App() {
  const Stack = createNativeStackNavigator();

  // interface Data {
  //   id: number,
  //   name: string,
  //   amount: number,
  //   category: string,
  //   date: string,
  // }

  // let init: Array<Data> = [];

  // const [expenses, setExpenses] = useState(init);
  // const [text, setText] = useState('');

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:8000/expenses/`);
  //     const data = res.data;
  //     setExpenses(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const handleChange = (event: any) => {
  //   setText(event.target.value);
  // }

  // const onPressFunction = () => {
  //   console.log('you pressed me');
  // }

  return (
    // <View style={styles.container}>
    //   {expenses && (<View><FlatList data={expenses} horizontal={true} inverted={true} renderItem={({ item }) => <Text style={styles.testtext}>{item.name}</Text>} /></View>)}
    //   <View>
    //     {expenses && (<FlatList data={expenses} renderItem={({ item }) => <Text style={styles.testtext}>{item.category}</Text>} style={styles.list2} />)}
    //   </View>
    //   <TextInput placeholder='type here' onChange={handleChange} value={text} />
    //   <Pressable onPress={onPressFunction}><Text>press me</Text></Pressable>
    //   <Button onPress={() => { alert('you tapped the button') }} title='press me button' />
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ title: 'Welcome' }} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='test' component={test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testtext: {
    border: '1px solid red',
    flex: 1,
  },
});
