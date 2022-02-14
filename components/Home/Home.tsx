import React from 'react';
import { Text, Button, View } from 'react-native';

function Home({ navigation }) {
    return (
        <View>
            <Button title='go to profile' onPress={() => navigation.navigate('Profile', { name: 'Lulu' })} />
            <Button title='go to test' onPress={() => navigation.navigate('test', { name: 'world' })} />
        </View>
    );
}

export default Home;