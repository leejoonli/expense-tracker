import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// set props to any because I don't know what else to put
function ExpenseDetail({ navigation, route }: any) {
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
    const id: number = route.params.id;

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

    // state variable to store the keys of response data
    const [keys, setKeys] = useState<Array<string> | undefined>([]);

    // useEffect to use api call
    useEffect(() => {
        getData(id);
    }, [id]);

    // api call function to get single expense.  Put Promise<void> because the function isn't returning anything and its a promise based function.  It works for now.
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
            // set state to array of keys
            setKeys(keys);
        } catch (error: any) {
            // error logging
            console.log(error);
        }
    }

    // delete function to remove data from database
    const handleDelete = async (): Promise<void> => {
        try {
            // get token from async storage
            const token: string | null = await AsyncStorage.getItem('token');
            // DELETE request to remove data from database
            const res = await axios.delete(`https://salty-eyrie-01871.herokuapp.com/expenses/${id}`, { headers: { Authorization: `Token ${token}` } });
            const status: number = res.status;
            if (status === 204) {
                // using alert for now to notify user that an expense is deleted
                alert('expense deleted');
                // navigate to profile
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
        <View style={styles.detailContainer}>
            {/* unsure how to make this typing error to go away */}
            <View style={styles.details}>
                {keys && keys.map((element, index) => {
                    return (
                        <Text key={`${index}`}>{expense[element]}</Text>
                    );
                })}
                <Pressable onPress={() => {
                    navigation.navigate('ExpenseEdit', { expense: expense });
                    Vibration.vibrate(10);
                }} style={{ backgroundColor: 'lemonchiffon' }}><Text>Edit</Text></Pressable>
                <Pressable onPress={handleDelete} style={{ backgroundColor: 'aqua' }}><Text>Delete</Text></Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
        padding: 50,
    },
    details: {
        borderWidth: 1,
        borderColor: 'red',
        padding: 10,
    }
});

export default ExpenseDetail;