/**
 * Final Project
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * 
 * REFERENCES:
 * 
 * Title: react native vector icons won't show in android device
 * Date: Asked 6 years, 4 months ago
 * URL: https://stackoverflow.com/questions/38878852/react-native-vector-icons-wont-show-in-android-device
 * 
 */

/************ Import Statements ************/
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Screen Imports
// import HomePage from './screens/HomePage.js';
// import MessageList from './screens/MessageList.js';
// import ProfileHome from './screens/ProfileHome.js';
import Tabs from './navigation/Tabs.js';
import Welcome from './screens/loginandsetup/Welcome.js';
import Login from './screens/loginandsetup/Login.js';
import SignUp from './screens/loginandsetup/SignUp.js';
import SignUp2 from './screens/loginandsetup/SignUp2.js';

/************ Auxiliary Code ************/
const Stack = createNativeStackNavigator();

/************ Main Function ************/
const App = () => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName='Welcome!'>
        <Stack.Screen
          name="Welcome!"
          component={Welcome}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
        />
        <Stack.Screen
          name="Sign Up 2"
          component={SignUp2}
          options = {{headerShown: false}}
        /> 

        <Stack.Screen
          name="Main Page"
          component={Tabs}
          options = {{headerShown: false}}
        />
      </Stack.Navigator>

    </NavigationContainer>

  );
};

/************ Styling ************/
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

/************ Export ************/
export default App;
