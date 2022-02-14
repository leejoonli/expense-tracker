import React, { useState } from 'react';
import { Text, Button, View } from 'react-native';

function Home({ navigation }) {
    const [display, setDisplay] = useState(true);
    return (
        <View>
            {display && <Button title='go to profile' onPress={() => navigation.navigate('Profile', { name: 'Lulu' })} />}
            {/* <Button title='go to profile' onPress={() => navigation.navigate('Profile', { name: 'Lulu' })} /> */}
        </View>
    );
}

export default Home;