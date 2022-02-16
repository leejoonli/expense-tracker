import React, { useState } from 'react';
import { Text, Button, View, Modal, TextInput, Pressable } from 'react-native';
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
            {/* <Pressable onPress={handleChange}><Text>submit edit</Text></Pressable> */}
        </View>
    );
}

export default ExpenseCreate;