import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

function ExpenseDetail({ navigation, route }) {
    // interface for data from api call
    interface Data {
        id: number,
        name: string,
        amount: number,
        category: string,
        date: string,
    }

    // variable to store id of expense
    const id = route.params.id;

    // initial state set to init object with interface Data
    const init: object = {};

    // state variable to store expense detail
    const [data, setData] = useState(init);

    // useEffect to use api call
    useEffect(() => {
        getData(id);
    }, [id]);

    // api call function to get single expense.  Put Promise<void> because the function isn't returning anything and its a promise based function
    const getData = async (id: number): Promise<void> => {
        try {
            const res = await axios.get(`https://salty-eyrie-01871.herokuapp.com/expenses/${id}`);
            const data = res.data;
            console.log(data)
            setData(data);
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(route)
    return (
        <View>
            <Text>
                {data.name}
            </Text>
        </View>
    );
}

export default ExpenseDetail;