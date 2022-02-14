import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function ExpenseDetail({ navigation, route }) {
    // console.log(route)
    return (
        <Text>
            {route.params.id}
        </Text>
    );
}

export default ExpenseDetail;