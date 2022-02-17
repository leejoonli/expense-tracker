import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, Vibration, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function ExpenseEdit({ navigation, route }: any) {
    // interface for expense
    interface Data {
        id: number,
        name: string,
        amount: number,
        category: string,
        date: string,
        expense_url: string,
        owner: string,
    }

    // get expense object from route.params
    const expense: Data = route.params.expense;

    // set state variable to expense variable listed above
    const [editExpense, setEditExpense] = useState(expense);

    // onchange handle function
    const handleExpenseChange = (event: string, key: string | number) => {
        setEditExpense({ ...editExpense, [key]: event });
    }

    // onsubmit function
    const handleEditSubmit = async (): Promise<void> => {
        try {
            // get token from async storage
            const token: string | null = await AsyncStorage.getItem('token');
            // PUT request for editing data
            const res = await axios.put(`https://salty-eyrie-01871.herokuapp.com/expenses/${expense.id}`, editExpense, { headers: { Authorization: `Token ${token}` } });
            const status: number = res.status;
            if (status === 200) {
                // using alert for now to notify user that an expense has been updated
                alert('expense changed');
                // navigate to expense detail
                navigation.popToTop();
                // vibration for user feedback
                Vibration.vibrate(10);
            }
        } catch (error: any) {
            // error logging
            console.log(error);
        }
    }

    return (
        <View style={styles.editContainer}>
            <View style={styles.edit}>
                <View>
                    <Text style={styles.formText}>Name:</Text>
                    <TextInput style={styles.input} placeholder='Name' onChangeText={(event) => handleExpenseChange(event, 'name')} value={editExpense.name} />
                </View>
                <View>
                    <Text style={styles.formText}>Amount:</Text>
                    <TextInput style={styles.input} placeholder='Amount' keyboardType='numeric' onChangeText={(event) => handleExpenseChange(event, 'amount')} value={editExpense.amount.toString()} />
                </View>
                <View>
                    <Text style={styles.formText}>Category:</Text>
                    <TextInput style={styles.input} placeholder='Category' onChangeText={(event) => handleExpenseChange(event, 'category')} value={editExpense.category} />
                </View>
                <View>
                    <Text style={styles.formText}>Date:</Text>
                    <TextInput style={styles.input} placeholder='Date: Use YYYY-MM-DD Format' onChangeText={(event) => handleExpenseChange(event, 'date')} value={editExpense.date} />
                </View>
                <Pressable style={styles.submit} onPress={handleEditSubmit}><Text style={styles.submitText}>Submit</Text></Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    editContainer: {
        flex: 1,
        padding: 20,
    },
    edit: {
        backgroundColor: '#0047bb',
        padding: 30,
    },
    formText: {
        color: 'white',
        fontSize: 20,
        marginBottom: 5,
    },
    input: {
        backgroundColor: 'white',
        paddingTop: 3,
        paddingLeft: 5,
        marginBottom: 10,
    },
    submit: {
        backgroundColor: 'white',
        padding: 5,
        width: 100,
        marginTop: 10,
    },
    submitText: {
        textAlign: 'center',
    }
});

export default ExpenseEdit;