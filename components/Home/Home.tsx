import React, { useEffect, useState } from 'react';
import { Text, Button, View, Modal, TextInput, Pressable, StyleSheet, Vibration } from 'react-native';
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
                // vibration response on mobile
                Vibration.vibrate(10);
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
                // vibration response on mobile
                Vibration.vibrate(10);
            }
        } catch (error: any) {
            // error logging
            console.log(error);
        }
    }

    return (
        <View style={styles.homeContainer}>
            {/* sign up modal */}
            <Modal
                animationType='slide'
                visible={signUpModal}
                onRequestClose={() => {
                    setSignUpModal(!signUpModal);
                }}
            >
                <View style={styles.modalContainer}>
                    <TextInput style={styles.formInput} placeholder='E-mail' onChangeText={(event) => handleSignUpChange(event, 'email')} value={signUpInput.email} />
                    <TextInput style={styles.formInput} placeholder='Username' onChangeText={(event) => handleSignUpChange(event, 'username')} value={signUpInput.username} />
                    <TextInput style={styles.formInput} placeholder='Password' onChangeText={(event) => handleSignUpChange(event, 'password')} value={signUpInput.password} />
                    <TextInput style={styles.formInput} placeholder='Re Password' onChangeText={(event) => handleSignUpChange(event, 're_password')} value={signUpInput.re_password} />
                    <View>
                        <Pressable style={styles.modalPressable} onPress={handleSignUpSubmit}><Text style={styles.pressableText}>Submit</Text></Pressable>
                        <Pressable style={styles.modalPressable} onPress={() => {
                            setSignUpModal(!signUpModal);
                            Vibration.vibrate(10);
                        }}><Text style={styles.pressableText}>Close</Text></Pressable>
                    </View>
                </View>
            </Modal>
            {/* login modal */}
            <Modal
                style={styles.loginModal}
                animationType='slide'
                visible={loginModal}
                onRequestClose={() => {
                    setLoginModal(!loginModal);
                }}
            >
                <View style={styles.modalContainer}>
                    <TextInput style={styles.formInput} placeholder='email' onChangeText={(event) => handleLoginChange(event, 'email')} value={loginInput.email} />
                    <TextInput style={styles.formInput} placeholder='password' onChangeText={(event) => handleLoginChange(event, 'password')} value={loginInput.password} />
                    <View>
                        <Pressable style={styles.modalPressable} onPress={handleLoginSubmit}><Text style={styles.pressableText}>Log In</Text></Pressable>
                        <Pressable style={[styles.modalPressable, styles.loginClose]} onPress={() => {
                            setLoginModal(!loginModal);
                            Vibration.vibrate(10);
                        }}><Text style={styles.pressableText}>Close</Text></Pressable>
                    </View>
                </View>
            </Modal>
            {loggedIn ? <Text style={styles.text}>Signed in as: {user.username}</Text> : <Text style={styles.text}>Not Signed In</Text>}
            {/* pressables to show either sign up or login modal, or to logout */}
            <Pressable onPress={() => {
                setSignUpModal(!signUpModal);
                Vibration.vibrate(10);
            }}><Text style={styles.text}>Sign Up</Text></Pressable>
            <Pressable onPress={() => {
                setLoginModal(!loginModal);
                Vibration.vibrate(10);
            }}><Text style={styles.text}>Log In</Text></Pressable>
            <Pressable onPress={handleLogout}><Text style={styles.text}>Log Out</Text></Pressable>
            {loggedIn && <Pressable onPress={() => {
                navigation.navigate('Profile');
                Vibration.vibrate(10);
            }} ><Text style={styles.text}>Go To Profile</Text></Pressable>}
        </View>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 100,
    },
    text: {
        backgroundColor: '#0047bb',
        textAlign: 'center',
        color: 'white',
        fontSize: 23,
        padding: 15,
        marginLeft: 45,
        marginRight: 45,
        marginTop: 0,
        marginBottom: 30,
        // for some reason this isn't loading on phone on expo so it's commented out
        // shadowColor: 'black',
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: .5,
        // shadowRadius: 4,
        // elevation: 5,
    },
    loginModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        marginTop: 50,
        marginLeft: 50,
        marginRight: 50,
        padding: 25,
        backgroundColor: '#0047bb',
        justifyContent: 'center',
    },
    formInput: {
        padding: 5,
        backgroundColor: 'white',
        color: 'black',
        marginBottom: 25,
    },
    modalPressable: {
        backgroundColor: 'white',
        marginBottom: 25,
        padding: 7,
        width: 100,
    },
    loginClose: {
        marginBottom: 0,
    },
    pressableText: {
        textAlign: 'center'
    },
});

export default Home;