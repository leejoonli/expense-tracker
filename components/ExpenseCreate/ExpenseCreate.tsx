import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, StyleSheet, Vibration } from 'react-native';
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
                // navigate to Home
                navigation.popToTop();
                // vibration for user feedback
                Vibration.vibrate(10);
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
        <View style={styles.createContainer}>
            <TextInput style={styles.input} placeholder='Name' onChangeText={(event) => handleChange(event, 'name')} value={createExpense.name} />
            <TextInput style={styles.input} placeholder='Amount' keyboardType='numeric' onChangeText={(event) => handleChange(event, 'amount')} value={createExpense.amount.toString()} />
            <TextInput style={styles.input} placeholder='Category' onChangeText={(event) => handleChange(event, 'category')} value={createExpense.category} />
            <TextInput style={styles.input} placeholder='Date: Use YYYY-MM-DD Format' onChangeText={(event) => handleChange(event, 'date')} value={createExpense.date} />
            <Pressable style={styles.pressable} onPress={handleSubmit}><Text style={styles.createText}>Create Expense</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    createContainer: {
        padding: 30,
        backgroundColor: '#0047bb',
        margin: 30,
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        paddingLeft: 5,
        marginBottom: 20,
    },
    pressable: {
        backgroundColor: 'white',
        padding: 5,
        width: 150,
    },
    createText: {
        textAlign: 'center',
    }
});

export default ExpenseCreate;