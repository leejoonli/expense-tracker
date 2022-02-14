import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable, Button, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Profile({ navigation, route }) {
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

    // test for text input
    const [text, setText] = useState('');

    // useEffect to make api call to fetch data
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            // make axios api call to heroku app
            const res = await axios.get(`https://salty-eyrie-01871.herokuapp.com/expenses/`);
            // extract data from response
            const data = res.data;
            // set state to data variable
            setExpenses(data);
        } catch (error) {
            // error logging
            console.log(error);
        }
    }

    // handle change test for text input.  need to figure out event type
    const handleChange = (event: any) => {
        setText(event.target.value);
    }

    // on press test for native pressable core component
    const onPressFunction = () => {
        console.log('you pressed me');
    }

    return (
        <View style={styles.container}>
            {expenses && (<FlatList data={expenses} horizontal={true} style={styles.expenseList} inverted={true} renderItem={({ item }) => <Text style={styles.testtext}>{item.name}</Text>} />)}
            {/* {expenses && (<FlatList data={expenses} renderItem={({ item }) => <Text style={styles.testtext}>{item.category}</Text>} style={styles.list2} />)} */}
            <View style={styles.testContainer}>
                <TextInput placeholder='type here' onChange={handleChange} value={text} />
                <Pressable onPress={onPressFunction}><Text>press me</Text></Pressable>
                <Button onPress={() => { alert('you tapped the button') }} title='press me button' />
                <Button title='go to test' onPress={() => navigation.navigate('test', { name: 'Lulu' })} />
                <StatusBar style="auto" />
                <Text>
                    hello from {route.params.name}
                </Text>
            </View>
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
    expenseList: {
        flex: 1,
    },
    testContainer: {
        flex: 1,
    },
    testtext: {
        borderColor: 'rgba(155, 0, 0, 1)',
        borderWidth: 2,
        flex: 1,
    },
});

export default Profile;