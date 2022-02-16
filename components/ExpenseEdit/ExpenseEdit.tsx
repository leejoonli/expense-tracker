import React, { useState, useEffect } from 'react';
import { Text, Button, View, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function ExpenseEdit({ navigation, route }) {
    // get expense object from route.params
    const expense = route.params.expense;

    // set state variable to expense variable listed above
    const [editExpense, setEditExpense] = useState(expense);

    // onchange handle function
    const handleExpenseChange = (event, key: string | number) => {
        setEditExpense({ ...editExpense, [key]: event });
    }

    // onsubmit function
    const handleEditSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await axios.put(`https://salty-eyrie-01871.herokuapp.com/expenses/${expense.id}`, editExpense, { headers: { Authorization: `Token ${token}` } });
            const status: number = res.status;
            if (status === 200) {
                // console.log('hello world')
                alert('expense changed')
                navigation.navigate('ExpenseDetail', { id: editExpense.id })
            }
        } catch (error) {
            console.log(error);
        }
    }

    // api post request

    return (
        <View>
            <TextInput placeholder='Name' onChangeText={(event) => handleExpenseChange(event, 'name')} value={editExpense.name} />
            <TextInput placeholder='Amount' onChangeText={(event) => handleExpenseChange(event, 'amount')} value={editExpense.amount} />
            <TextInput placeholder='Category' onChangeText={(event) => handleExpenseChange(event, 'category')} value={editExpense.category} />
            <TextInput placeholder='Date' onChangeText={(event) => handleExpenseChange(event, 'date')} value={editExpense.date} />
            <Pressable onPress={handleEditSubmit}><Text>submit edit</Text></Pressable>
        </View>
    );
}

export default ExpenseEdit;