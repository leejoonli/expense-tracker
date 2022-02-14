import React, { useState } from 'react';
import { Text, Button, View } from 'react-native';

// home component will be the login screen
function Home({ navigation }) {
    // set state to conditionally render home component
    const [display, setDisplay] = useState(true);

    // login request

    // logout request

    // render a sign up or login screen depending on state
    return (
        <View>
            {display && <Button title='go to profile' onPress={() => navigation.navigate('Profile', { name: 'Lulu' })} />}
            {/* <Button title='go to profile' onPress={() => navigation.navigate('Profile', { name: 'Lulu' })} /> */}
        </View>
    );
}

export default Home;