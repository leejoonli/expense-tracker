import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import axios from 'axios';

// set types for props
function ExpenseDetail({ navigation, route }) {
    // interface for data from api call
    interface Data {
        id: number,
        name: string,
        amount: number,
        category: string,
        date: string,
        expense_url: string,
        owner: string,
    }

    // variable to store id of expense
    const id = route.params.id;

    // initial state set to init object with interface Data
    const init: Data = {
        id: 0,
        name: '',
        amount: 0,
        category: '',
        date: '',
        expense_url: '',
        owner: '',
    };

    // state variable to store expense detail
    const [expense, setExpense] = useState(init);

    const [keys, setKeys] = useState<Array<string> | undefined>([]);

    // useEffect to use api call
    useEffect(() => {
        getData(id);
    }, [id]);

    // api call function to get single expense.  Put Promise<void> because the function isn't returning anything and its a promise based function
    const getData = async (id: number): Promise<void> => {
        try {
            // add typings for variables and axios http request
            const res = await axios.get(`https://salty-eyrie-01871.herokuapp.com/expenses/${id}`);
            // store data from response to variable
            const data = res.data;
            // set state to response data
            setExpense(data);
            // turn object keys into array of strings and filter out the ones not to display
            const keys: Array<string> = Object.keys(expense).filter((element) => { return element !== 'id' && element !== 'expense_url' && element !== 'owner' });
            // console.log(keys);
            // set state to array of keys
            setKeys(keys);
        } catch (error) {
            // error logging
            console.log(error)
        }
    }

    // console.log(route)
    return (
        <View>
            {/* need to fix this typing issue */}
            {keys && keys.map((element, index) => {
                return (
                    <Text key={`${index}`}>{expense[element]}</Text>
                )
            })}
            <Pressable onPress={() => navigation.navigate('ExpenseEdit', { expense: expense })} style={{ backgroundColor: 'lemonchiffon' }}><Text>Edit</Text></Pressable>
            <Pressable onPress={() => console.log('delete')} style={{ backgroundColor: 'aqua' }}><Text>Delete</Text></Pressable>
        </View>
    );
}

export default ExpenseDetail;