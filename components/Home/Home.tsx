import React, { useState } from 'react';
import { Text, Button, View, Modal, TextInput, Pressable } from 'react-native';

// home component will be the login screen
// set types for props
function Home({ navigation }) {
    // set state to conditionally render home component
    const [display, setDisplay] = useState(true);

    // sign up init type declaration
    const signUpInit: {
        username: string,
        email: string,
        password: string,
        re_password: string,
    } = {
        username: '',
        email: '',
        password: '',
        re_password: '',
    }

    // log in init type declaration
    const logInInit: {
        email: string,
        password: string,
    } = {
        email: '',
        password: '',
    }

    const [signUpInput, setSignUpInput] = useState(signUpInit);
    const [loginInput, setloginInput] = useState(logInInit);
    const [signUpModal, setSignUpModal] = useState<boolean>(false);
    const [loginModal, setLoginModal] = useState<boolean>(false);

    // handle change function for sign up request
    const handleSignUpChange = (event, key: string) => {
        setSignUpInput({ ...signUpInput, [key]: event.target.value });
    }

    // handle change function for login request
    const handleLoginChange = (event) => {
        setloginInput(event.target.value);
    }

    // sign up request

    // login request

    // logout request

    // render a sign up or login screen depending on state
    return (
        // <View>
        //     {display && <Button title='go to profile' onPress={() => navigation.navigate('Profile', { name: 'Lulu' })} />}
        //     {/* <Button title='go to profile' onPress={() => navigation.navigate('Profile', { name: 'Lulu' })} /> */}
        // </View>
        <View>
            <Modal
                animationType='slide'
                visible={signUpModal}
                onRequestClose={() => {
                    setSignUpModal(!signUpModal);
                }}
            >
                <View>
                    <TextInput placeholder='Username' onChange={(event) => handleSignUpChange(event, 'username')} value={signUpInput.username} />
                    <TextInput placeholder='E-mail' onChange={(event) => handleSignUpChange(event, 'email')} value={signUpInput.email} />
                    <TextInput placeholder='Password' onChange={(event) => handleSignUpChange(event, 'password')} value={signUpInput.password} />
                    <TextInput placeholder='Re Password' onChange={(event) => handleSignUpChange(event, 're_password')} value={signUpInput.re_password} />
                    <Pressable onPress={() => setSignUpModal(!signUpModal)}><Text>close</Text></Pressable>
                </View>
            </Modal>
            <Modal
                animationType='slide'
                visible={loginModal}
                onRequestClose={() => {
                    setLoginModal(!loginModal);
                }}
            >
                <View>
                    <TextInput placeholder='login' onChange={handleLoginChange} value={loginInput} />
                    <Pressable onPress={() => setLoginModal(!loginModal)}><Text>close</Text></Pressable>
                </View>
            </Modal>
            <Pressable onPress={() => setSignUpModal(!signUpModal)}><Text>sign up</Text></Pressable>
            <Pressable onPress={() => setLoginModal(!loginModal)}><Text>log in</Text></Pressable>
            <Pressable onPress={() => console.log('logout')}><Text>log out</Text></Pressable>
        </View>
    );
}

export default Home;