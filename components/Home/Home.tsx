import React, { useEffect, useState } from 'react';
import { Text, Button, View, Modal, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// home component will be the login screen
// set types for props
function Home({ navigation }) {
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

    const [bool, setBool] = useState(false);

    // const test = async () => {
    //     try {
    //         const val = await AsyncStorage.setItem('test', 'hello world');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // test();

    const getData = async (): Promise<boolean | undefined> => {
        // return await AsyncStorage.getItem('token');
        try {
            const value = await AsyncStorage.getItem('token');
            if (!value) {
                setBool(false);
            }
            else {
                setBool(true);
            }
            return;
        } catch (error) {
            // https://stackoverflow.com/questions/54812453/function-lacks-ending-return-statement-and-return-type-does-not-include-undefin
            throw (error);
        }
    }

    // state variable to check for initial login state
    const [loggedIn, setLoggedIn] = useState<boolean>(bool);

    // state variable to store login information
    const [user, setUser] = useState(loggedInInit);

    // function to get user info if already logged in
    const getUserInfo = async (): Promise<void> => {
        try {
            // GET request to retrieve current logged in user's information
            const res = await axios.get(`https://salty-eyrie-01871.herokuapp.com/users/me`, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } });
            const status: number = res.status;
            if (status === 200) {
                // set response data to user state variable
                setUser(res.data);
            }
            else {
                // conditional to check if no user currently logged in
                setLoggedIn(bool);
                setUser(loggedInInit);
            }
        } catch (error) {
            // error logging
            console.log(error);
        }
    }

    // useEffect to check to see if user is already logged in
    useEffect(() => {
        if (loggedIn) {
            getUserInfo();
        }
    }, [loggedIn]);

    // handle change function for sign up request
    const handleSignUpChange = (event, key: string) => {
        setSignUpInput({ ...signUpInput, [key]: event.target.value });
    }

    // handle change function for login request
    const handleLoginChange = (event, key: string) => {
        setloginInput({ ...loginInput, [key]: event });
    }

    // sign up request
    const handleSignUpSubmit = async (): Promise<void> => {
        try {
            const res = await axios.post(`https://salty-eyrie-01871.herokuapp.com/users/`, signUpInput);
            const status: number = res.status;
            if (status === 201) {
                setUser(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // login request
    const handleLoginSubmit = async (): Promise<void> => {
        try {
            const res: Response = await axios.post(`https://salty-eyrie-01871.herokuapp.com/token/login`, loginInput, {
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
                // await setLoggedIn(true);
                await getData();
                setLoggedIn(true);
            }
        } catch (error) {
            // error logging
            console.log(error);
        }
    }

    // logout request
    const handleLogout = async (): Promise<void> => {
        try {
            // variable for async storage
            const val = await AsyncStorage.getItem('token');
            // console.log(val);
            // post request to destroy auth token
            const res = await axios.post(`https://salty-eyrie-01871.herokuapp.com/token/logout`, val, {
                headers: { Authorization: `Token ${val}` }
            });
            const status: number = res.status;
            if (status === 204) {
                // clear local storage and set logged in to false
                localStorage.clear();
                setLoggedIn(false);
            }
        } catch (error) {
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
                    <TextInput placeholder='E-mail' onChange={(event) => handleSignUpChange(event, 'email')} value={signUpInput.email} />
                    <TextInput placeholder='Username' onChange={(event) => handleSignUpChange(event, 'username')} value={signUpInput.username} />
                    <TextInput placeholder='Password' onChange={(event) => handleSignUpChange(event, 'password')} value={signUpInput.password} />
                    <TextInput placeholder='Re Password' onChange={(event) => handleSignUpChange(event, 're_password')} value={signUpInput.re_password} />
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
            <Button title='go to profile' onPress={() => navigation.navigate('Profile', { name: 'Lulu' })} />
        </View>
    );
}

export default Home;