import React, { useState } from 'react';
import { Text, Button, View, Modal, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function ExpenseCreate({ navigation, route }: any) {
    // initial state for createExpense
    const createInit: {
        name: string,
        amount: number,
        category: string,
        date: string,
    } = {
        name: '',
        amount: 0,
        category: '',
        date: '',
    }

    // state variable to store new expense
    const [createExpense, setCreateExpense] = useState(createInit);

    // POST request to add new expense to database
    const handleSubmit = async (): Promise<void> => {
        try {
            // get token from async storage
            const token: string | null = await AsyncStorage.getItem('token');
            // POST request to create new expense to database
            const res = await axios.post(`https://salty-eyrie-01871.herokuapp.com/expenses/`, createExpense, { headers: { Authorization: `Token ${token}` } });
            const status: number = res.status;
            if (status === 201) {
                // set create expense state variable to initial state
                setCreateExpense(createInit);
                // using alert for now to notify user of new expense created
                alert('you created a new expense');
                // navigate to Profile
                // navigation.navigate('Profile', { name: 'Lulu' });
                navigation.popToTop();
            }
        } catch (error: any) {
            // error logging
            console.log(error);
        }
    }

    // on change handler for textinputs
    const handleChange = (event: string, key: string) => {
        setCreateExpense({ ...createExpense, [key]: event });
    }

    return (
        <View>
            <TextInput placeholder='Name' onChangeText={(event) => handleChange(event, 'name')} value={createExpense.name} />
            <TextInput placeholder='Amount' keyboardType='numeric' onChangeText={(event) => handleChange(event, 'amount')} value={createExpense.amount.toString()} />
            <TextInput placeholder='Category' onChangeText={(event) => handleChange(event, 'category')} value={createExpense.category} />
            <TextInput placeholder='Date' onChangeText={(event) => handleChange(event, 'date')} value={createExpense.date} />
            <Pressable onPress={handleSubmit} style={{ backgroundColor: 'lemonchiffon' }}><Text>create</Text></Pressable>
        </View>
    );
}

export default ExpenseCreate;