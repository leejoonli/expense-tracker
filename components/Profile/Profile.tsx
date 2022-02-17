import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Vibration } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// need to find types for props that are currently listed
function Profile({ navigation, route }: any) {
    // interface for data from api call
    interface Data {
        id: number,
        name: string,
        amount: number,
        category: string,
        date: string,
    }

    // initial state using the interface
    let init: Array<Data> = [];

    // set list of expenses state to init variable
    const [expenses, setExpenses] = useState(init);

    // useEffect to make api call to fetch data
    useEffect(() => {
        getData();
    }, []);

    const getData = async (): Promise<void> => {
        try {
            // https://stackoverflow.com/questions/26906630/django-rest-framework-authentication-credentials-were-not-provided
            // get the token from async storage and send it with GET request
            const token: string | null = await AsyncStorage.getItem('token');
            // haven't set response or response data type because I don't know what to put
            // make axios api call to heroku app
            const res = await axios.get(`https://salty-eyrie-01871.herokuapp.com/expenses/`, { headers: { Authorization: `Token ${token}` } });
            // extract data from response
            const data = res.data;
            // set state to data variable
            setExpenses(data);
        } catch (error) {
            // error logging
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => {
                navigation.navigate('ExpenseCreate');
                Vibration.vibrate(10);
            }}><Text style={styles.profileTitle}>Add New Expense</Text></Pressable>
            {expenses && (
                <FlatList
                    data={expenses}
                    style={styles.expenseList}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => {
                            navigation.navigate('ExpenseDetail', { id: item.id });
                            Vibration.vibrate(10);
                        }}>
                            <View style={styles.expenseLink}>
                                <Text style={styles.text}>{item.name}</Text>
                                <Text style={styles.text}>${item.amount}</Text>
                            </View>
                        </Pressable>
                    )} />)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileTitle: {
        backgroundColor: '#0047bb',
        color: 'white',
        fontSize: 20,
        width: 260,
        padding: 10,
        marginTop: 20,
        textAlign: 'center',
    },
    expenseList: {
        flex: 1,
        width: 300,
        padding: 20,
    },
    expenseLink: {
        backgroundColor: '#0047bb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginBottom: 15,
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
});

export default Profile;