import React from 'react';
import { Text, Button } from 'react-native';

function Home({ navigation }) {
    return (
        <Button title='go to profile' onPress={() => navigation.navigate('Profile', { name: 'Lulu' })} />
    );
}

export default Home;