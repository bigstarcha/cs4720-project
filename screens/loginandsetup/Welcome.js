/**
 * This page will be the login page.
 * 
 * REFERENCES:
 * 
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
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

/************ Main Function ************/
const Welcome = ({ navigation }) => {
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
    return (
        <View>
            <Text style={styles.welcomeText}>
                Hi, welcome to Developr.
            </Text>
            <TouchableOpacity style={styles.signUpButton} onPress={() => {navigation.navigate('Sign Up')}}>
                <Text style={styles.signUpText}>
                    Sign Up
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logInButton} onPress={() => {navigation.navigate('Login')}}>
                <Text style={styles.logInText}>
                    Login
                </Text>
            </TouchableOpacity>
            {user ? navigation.navigate('Main Page') : null}
        </View>
    );

};

/************ Styling ************/
const styles = StyleSheet.create({
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
export default Welcome;