/**
 * This page will be the login page.
 * 
 * REFERENCES:
 * Title: Authentication
 * Date: 2022
 * URL: https://rnfirebase.io/auth/usage
 * 
 */
// import React from 'react';

/************ Import Statements ************/
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput
} from 'react-native';

import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

/************ Main Function ************/
const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    const signUp = () => {
        console.log('Signed up!')
        if(email == '' || password == '') {
            alert('Please fill in all fields');
            return;
        }
        console.log('Its morbin time')
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                }
                else if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                }
                else {
                    alert(error);
                }
            });
    }



    return (
        <View style = {styles.loginFrame}>
            <Text style={styles.welcomeText}>
                Hi, welcome to Developr.
            </Text>
            <TextInput
                style={{ height: 50, borderColor: 'gray', borderBottomWidth: 0.5, fontSize: 15 }}
                onChangeText={text => setEmail(text)}
                value={email}
                autoCompleteType="email"
                keyboardType="email-address"
                placeholder='Email Address'
            />
            <TextInput
                style={{ height: 50, borderColor: 'gray', borderBottomWidth: 0.5, fontSize: 15, marginBottom: 45 }}
                onChangeText={text => setPassword(text)}
                value={password}
                autoCompleteType="password"
                keyboardType="default"
                placeholder='Password'
                secureTextEntry={true}
            />
            <Button
                title="Sign Up"
                onPress={() => signUp()}
            />

            {user ? navigation.navigate('Sign Up 2') : null}
        </View>
    );

};

/************ Styling ************/
const styles = StyleSheet.create({
    loginFrame: {
        marginLeft: 10,
        marginRight: 10
    },
    welcomeText: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    signUpButton: {
        marginTop: 10,
        marginBottom: 10
    },
    signUpText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    logInButton: {
        marginTop: 10,
        marginBottom: 10
    },
    logInText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});

/************ Export ************/
export default SignUp;