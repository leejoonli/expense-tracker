import React, { useState, useEffect } from 'react';
import { Text, Button, View, TextInput } from 'react-native';

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
    // api post request

    return (
        <View>
            <TextInput placeholder='Name' onChangeText={(event) => handleExpenseChange(event, 'name')} value={editExpense.name} />
            <TextInput placeholder='Amount' onChangeText={(event) => handleExpenseChange(event, 'amount')} value={editExpense.amount} />
            <TextInput placeholder='Category' onChangeText={(event) => handleExpenseChange(event, 'category')} value={editExpense.category} />
            <TextInput placeholder='Date' onChangeText={(event) => handleExpenseChange(event, 'date')} value={editExpense.date} />
        </View>
    );
}

export default ExpenseEdit;