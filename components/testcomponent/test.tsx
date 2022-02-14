import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function test(props) {
    return (
        <Text>
            hello {props.route.params.name}
        </Text>
    );
}

export default test;