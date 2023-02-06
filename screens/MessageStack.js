/**
 * This is the message stack file and it has the stack for your message stuff.
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

/************ Import Statements ************/
import {

    View,
    Text,
    Button,

} from 'react-native';
import MessageList from './messagescreens/MessageList';
import IndividualMessage from './messagescreens/IndividualMessage';

/************ Auxiliary Code ************/
// Stack allows us to do page navigation with the back arrow
const Stack = createNativeStackNavigator();

/************ Main Function ************/
const ProfileStack = () => {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Messages'>
                <Stack.Screen
                name="Messages"
                component={MessageList}
                options={{ title: "Messages"}}
                />
                <Stack.Screen 
                name="Chat"
                component={IndividualMessage}
                options={{ title: "Chat"}}
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