import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import Test from './components/testcomponent/test';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  interface Data {
    id: number,
    name: string,
    amount: number,
    category: string,
    date: string,
  }

  let init: Array<Data> = [];

  const [expenses, setExpenses] = useState(init);
  const [text, setText] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/expenses/`);
      const data = res.data;
      setExpenses(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event: any) => {
    setText(event.target.value);
  }

  const onPressFunction = () => {
    console.log('you pressed me');
  }

  return (
    <View style={styles.container}>
      <View>
        {expenses && (<FlatList data={expenses} renderItem={({ item }) => <Text>{item.name}</Text>} style={styles.list} />)}
      </View>
      <View>
        {expenses && (<FlatList data={expenses} renderItem={({ item }) => <Text>{item.category}</Text>} style={styles.list2} />)}
      </View>
      <TextInput placeholder='type here' onChange={handleChange} value={text} style={styles.test} />
      <Pressable onPress={onPressFunction}><Text>press me</Text></Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  list2: {
    flex: 1,
    flexDirection: 'row',
  },
});
