import React, { useState } from 'react';
import { Text, Button, View, Modal, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function ExpenseCreate({ navigation, route }) {
    // initial state for createExpense
    const createInit: {
        name: string,
        amount: string,
        category: string,
        date: string,
    } = {
        name: '',
        amount: '',
        category: '',
        date: '',
    }

    // state variable to store new expense
    const [createExpense, setCreateExpense] = useState(createInit);

    // POST request to add new expense to database
    const handleSubmit = async () => {
        try {
            // get token from async storage
            const token = await AsyncStorage.getItem('token');
            const res = await axios.post(`https://salty-eyrie-01871.herokuapp.com/expenses/`, createExpense, { headers: { Authorization: `Token ${token}` } });
            const status: number = res.status;
            if (status === 201) {
                console.log('hello world');
                setCreateExpense(createInit);
                alert('you created a new expense');
                navigation.navigate('Profile', { name: 'Lulu' });
            }
        } catch (error) {
            // error logging
            console.log(error);
        }
    }
    // if successful navigate to Profile

    // on change handler for textinputs
    const handleChange = (event, key: string) => {
        setCreateExpense({ ...createExpense, [key]: event });
    }

    return (
        <View>
            <TextInput placeholder='Name' onChangeText={(event) => handleChange(event, 'name')} value={createExpense.name} />
            <TextInput placeholder='Amount' onChangeText={(event) => handleChange(event, 'amount')} value={createExpense.amount} />
            <TextInput placeholder='Category' onChangeText={(event) => handleChange(event, 'category')} value={createExpense.category} />
            <TextInput placeholder='Date' onChangeText={(event) => handleChange(event, 'date')} value={createExpense.date} />
            <Pressable onPress={handleSubmit} style={{ backgroundColor: 'lemonchiffon' }}><Text>create</Text></Pressable>
        </View>
    );
}

export default ExpenseCreate;