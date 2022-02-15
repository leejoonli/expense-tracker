import React, { useState, useEffect } from 'react';
import { Text, Button, View } from 'react-native';

function ExpenseEdit({ navigation, route }) {
    // get expense object from route.params
    const expense: object = route.params.expense;

    // set state variable to expense variable listed above
    const [editExpense, setEditExpense] = useState(expense);

    // onchange handle function

    // onsubmit function
    // api post request

    return (
        <Text>
            hello world
        </Text>
    );
}

export default ExpenseEdit;