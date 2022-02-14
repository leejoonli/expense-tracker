import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable, Button, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Profile({ navigation, route }) {
    interface Data {
        id: number,
        name: string,
        amount: number,
        category: string,
        date: string,
    }

    let init: Array<Data> = [];

    const [expenses, setExpenses] = useState(init);
    const [text, setText] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/expenses/`);
            const data = res.data;
            setExpenses(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event: any) => {
        setText(event.target.value);
    }

    const onPressFunction = () => {
        console.log('you pressed me');
    }

    return (
        <View style={styles.container}>
            {expenses && (<View><FlatList data={expenses} horizontal={true} inverted={true} renderItem={({ item }) => <Text style={styles.testtext}>{item.name}</Text>} /></View>)}
            {/* {expenses && (<FlatList data={expenses} renderItem={({ item }) => <Text style={styles.testtext}>{item.category}</Text>} style={styles.list2} />)} */}
            <TextInput placeholder='type here' onChange={handleChange} value={text} />
            <Pressable onPress={onPressFunction}><Text>press me</Text></Pressable>
            <Button onPress={() => { alert('you tapped the button') }} title='press me button' />
            <Button title='go to test' onPress={() => navigation.navigate('test', { name: 'Lulu' })} />
            <StatusBar style="auto" />
            <Text>
                hello from {route.params.name}
            </Text>
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
    testtext: {
        border: '1px solid red',
        flex: 1,
    },
});

export default Profile;