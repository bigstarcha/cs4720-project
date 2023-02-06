/**
 * This is the profile stack file and it has the stack for your profile stuff.
 * 
 * REFERENCES:
 * 
 * 
 */
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileHome from './profilescreens/ProfileHome';
import EditProfile from './profilescreens/EditProfile';
import Help from './profilescreens/Help';
import Settings from './profilescreens/Settings';
import Login from './loginandsetup/Login';

/************ Import Statements ************/
import {

    View,
    Text,
    Button,

} from 'react-native';

/************ Auxiliary Code ************/
// Stack allows us to do page navigation with the back arrow
const Stack = createNativeStackNavigator();

/************ Main Function ************/
const ProfileStack = () => {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Profile Home'>
                <Stack.Screen
                name="Profile Home"
                component={ProfileHome}
                options={{ title: "Profile"}}
                />
                <Stack.Screen 
                name="Edit Profile"
                component={EditProfile}
                options={{ title: "Edit Profile"}}
                />
                <Stack.Screen 
                name="Settings"
                component={Settings}
                options={{ title: "Settings"}}
                />
                <Stack.Screen 
                name="Help"
                component={Help}
                options={{ title: "Help"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );

};

/************ Styling ************/
// const styles = StyleSheet.create({

// });

/************ Export ************/
export default ProfileStack;