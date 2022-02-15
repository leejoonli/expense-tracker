import React, { useState, useEffect } from 'react';
import { Text, Button, View } from 'react-native';

function ExpenseEdit({ navigation, route }) {
    const test: object = route.params.expense;
    console.log(test);

    return (
        <Text>
            hello world
        </Text>
    );
}

export default ExpenseEdit;