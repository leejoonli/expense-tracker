import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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

  return (
    <View style={styles.container}>
      {expenses && (
        <>
          {expenses.map((element, index) => {
            return (
              <View key={index}>
                <Text>{element.name}</Text>
                <Text>{element.amount}</Text>
                <Text>{element.category}</Text>
                <Text>{element.date}</Text>
              </View>
            )
          })}
        </>
      )}
      <Text>hello world</Text>
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
});
