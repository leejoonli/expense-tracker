import React, { useEffect, useState } from 'react';
import { Text, Button, View, Modal, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// set props to any because I don't know what else to put
function Home({ navigation }: any) {
    // interface for api call response but got type error so leaving it commented out
    // interface Res {
    //     config: object,
    //     data: object,
    //     headers: object,
    //     request: XMLHttpRequest
    //     status: number,
    //     statusText: string,
    // }

    // sign up init type declaration
    const signUpInit: {
        email: string,
        username: string,
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

    // initial login state type declaration
    const loggedInInit: {
        email: string,
        id: number,
        username: string,
    } = {
        email: '',
        id: 0,
        username: '',
    }

    // state variables for showing/closing sign up and login modals and sign up and login inputs
    const [signUpInput, setSignUpInput] = useState(signUpInit);
    const [loginInput, setloginInput] = useState(logInInit);
    const [signUpModal, setSignUpModal] = useState<boolean>(false);
    const [loginModal, setLoginModal] = useState<boolean>(false);

    const getData = async (): Promise<boolean | undefined> => {
        try {
            const value: string | null = await AsyncStorage.getItem('token');
            if (!value) {
                setLoggedIn(false);
            }
            else {
                setLoggedIn(true);
            }
            return;
        } catch (error: any) {
            // https://stackoverflow.com/questions/54812453/function-lacks-ending-return-statement-and-return-type-does-not-include-undefin
            throw (error);
        }
    }

    // state variable to check for initial login state
    const [loggedIn, setLoggedIn] = useState<boolean>();

    // state variable to store login information
    const [user, setUser] = useState(loggedInInit);

    // function to get user info if already logged in
    const getUserInfo = async (): Promise<void> => {
        try {
            // grab token from async storage
            const token: string | null = await AsyncStorage.getItem('token');
            // GET request to retrieve current logged in user's information
            const res = await axios.get(`https://salty-eyrie-01871.herokuapp.com/users/me`, { headers: { Authorization: `Token ${token}` } });
            console.log(res)
            const status: number = res.status;
            if (status === 200) {
                // set response data to user state variable
                setUser(res.data);
            }
            else {
                // conditional to check if no user currently logged in
                setLoggedIn(true);
                setUser(loggedInInit);
            }
        } catch (error: any) {
            // error logging
            console.log(error);
        }
    }

    // useEffect to check to see if user is already logged in
    useEffect(() => {
        getData();
        if (loggedIn) {
            getUserInfo();
        }
    }, [loggedIn]);

    // handle change function for sign up request
    const handleSignUpChange = (event: string, key: string): void => {
        setSignUpInput({ ...signUpInput, [key]: event });
    }

    // handle change function for login request
    const handleLoginChange = (event: string, key: string): void => {
        setloginInput({ ...loginInput, [key]: event });
    }

    // sign up request
    const handleSignUpSubmit = async (): Promise<void> => {
        try {
            // POST request to sign up as a user
            const res = await axios.post(`https://salty-eyrie-01871.herokuapp.com/users/`, signUpInput);
            const status: number = res.status;
            if (status === 201) {
                // set response data to user state variable
                // setUser(res.data);
                // close sign up modal
                setSignUpModal(false);
            }
        } catch (error: any) {
            // error logging
            console.log(error);
        }
    }

    // login request
    const handleLoginSubmit = async (): Promise<void> => {
        try {
            // don't know why this has a headers object in it but leaving it for now
            const res = await axios.post(`https://salty-eyrie-01871.herokuapp.com/token/login`, loginInput, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const status: number = res.status;
            if (status === 200) {
                // set auth token in local storage
                // console.log(res);
                await AsyncStorage.setItem('token', res.data.auth_token);
                // close login modal and set logged in to true
                setLoginModal(!loginModal);
                setLoggedIn(true);
            }
        } catch (error: any) {
            // error logging
            console.log(error);
        }
    }

    // logout request
    const handleLogout = async (): Promise<void> => {
        try {
            // variable for async storage
            const token: string | null = await AsyncStorage.getItem('token');
            // post request to destroy auth token
            const res = await axios.post(`https://salty-eyrie-01871.herokuapp.com/token/logout`, token, {
                headers: { Authorization: `Token ${token}` }
            });
            const status: number = res.status;
            if (status === 204) {
                // clear local storage and set logged in to false
                await AsyncStorage.clear();
                setLoggedIn(false);
            }
        } catch (error: any) {
            // error logging
            console.log(error);
        }
    }

    return (
        <View>
            {/* sign up modal */}
            <Modal
                animationType='slide'
                visible={signUpModal}
                onRequestClose={() => {
                    setSignUpModal(!signUpModal);
                }}
            >
                <View>
                    <TextInput placeholder='E-mail' onChangeText={(event) => handleSignUpChange(event, 'email')} value={signUpInput.email} />
                    <TextInput placeholder='Username' onChangeText={(event) => handleSignUpChange(event, 'username')} value={signUpInput.username} />
                    <TextInput placeholder='Password' onChangeText={(event) => handleSignUpChange(event, 'password')} value={signUpInput.password} />
                    <TextInput placeholder='Re Password' onChangeText={(event) => handleSignUpChange(event, 're_password')} value={signUpInput.re_password} />
                    <Pressable onPress={handleSignUpSubmit}><Text>submit</Text></Pressable>
                    <Pressable onPress={() => setSignUpModal(!signUpModal)}><Text>close</Text></Pressable>
                </View>
            </Modal>
            {/* login modal */}
            <Modal
                animationType='slide'
                visible={loginModal}
                onRequestClose={() => {
                    setLoginModal(!loginModal);
                }}
            >
                <View>
                    <TextInput placeholder='email' onChangeText={(event) => handleLoginChange(event, 'email')} value={loginInput.email} />
                    <TextInput placeholder='password' onChangeText={(event) => handleLoginChange(event, 'password')} value={loginInput.password} />
                    <Pressable onPress={handleLoginSubmit}><Text>log in</Text></Pressable>
                    <Pressable onPress={() => setLoginModal(!loginModal)}><Text>close</Text></Pressable>
                </View>
            </Modal>
            {loggedIn && <Text>{user.username}</Text>}
            {/* pressables to show either sign up or login modal, or to logout */}
            <Pressable onPress={() => setSignUpModal(!signUpModal)}><Text>sign up</Text></Pressable>
            <Pressable onPress={() => setLoginModal(!loginModal)}><Text>log in</Text></Pressable>
            <Pressable onPress={handleLogout}><Text>log out</Text></Pressable>
            {loggedIn && <Button title='go to profile' onPress={() => navigation.navigate('Profile', { name: 'Lulu' })} />}
        </View>
    );
}

export default Home;