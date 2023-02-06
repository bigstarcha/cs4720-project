/**
 * This page will return the tabs component.
 * 
 * REFERENCES:
 * 
 * Title: Bottom Navigation Bar Tutorial in React Native
 * Author: Indently
 * Date: July 8, 2021
 * URL: https://www.youtube.com/watch?v=AnjyzruZ36E&ab_channel=Indently
 * 
 * Title: Custom Bottom Tab Navigator in React Native | React Navigation v5 Tutorial
 * Author: Pradip Debnath
 * Date: April 6, 2021
 * URL: https://www.youtube.com/watch?v=gPaBicMaib4&t=589s&ab_channel=PradipDebnath
 * 
 * Title: Tab Navigation
 * URL: https://reactnavigation.org/docs/tab-based-navigation/
 * 
 */

/************ Import Statements ************/
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomePage from "../screens/HomePage";
import MessageStack from "../screens/MessageStack";
import ProfileStack from "../screens/ProfileStack";

import auth from '@react-native-firebase/auth';

/************ Auxiliary Code ************/
const Tab = createBottomTabNavigator();

/************ Main Function ************/
const Tabs = ({navigation}) => {

    // if the user is not logged in, go back to the welcome screen
    auth().onAuthStateChanged((user) => {
        if (!user) {
            navigation.navigate('Welcome!');
        }
    });
    
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions = {({route}) => ({

                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'grey',
                tabBarStyle: {
                    "display": "flex"
                },

                tabBarIcon: ({focused, color}) => {
                    let iconName; // This will be either Home, Messages, or Profile

                    if (route.name === "Messages") {
                        iconName = focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"
                    } else if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline"
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline"
                    }

                    return <Ionicons name={iconName} size={28} color={color}/>
                }
            })}>

            <Tab.Screen name = "Messages" component = {MessageStack} options = {{headerShown: false}} />
            <Tab.Screen name = "Home" component = {HomePage} options = {{title: "Discover"}} />
            <Tab.Screen name = "Profile" component = {ProfileStack} options = {{headerShown: false}} />
        </Tab.Navigator>
    );
}

/************ Styling ************/
// const styles = StyleSheet.create({
//     position: 'absolute',
//     bottom: 25,
//     left: 20,
//     right: 20,
//     elevation: 0,
//     backgroundColor: '#D9FDFF'
// })

/************ Export ************/
export default Tabs;