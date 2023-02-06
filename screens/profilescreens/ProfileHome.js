/**
 * This is the main page for your profile and it lists the options for what you want to do.
 * 
 * REFERENCES:
 * Title: FlatList
 * URL: https://reactnative.dev/docs/flatlist
 * 
 * Title: View Style Props
 * URL: https://reactnative.dev/docs/view-style-props
 * 
 * Title: Make Circular Image in React Native using Border Radius
 * URL: https://aboutreact.com/react-native-round-shape-image/
 * 
 */
import React from 'react';

/************ Import Statements ************/
import {

    View,
    Text,
    Image,
    Button,
    StyleSheet,
    FlatList,
    TouchableOpacity

} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
//import logout from '../loginandsetup/Login.js';
import auth from '@react-native-firebase/auth';
//import navigateTo from '../../navigation/Tabs.js';
import storage from '@react-native-firebase/storage';
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';


/************ Auxiliary Code ************/
const OPTIONS = [
    {
        key: '01',
        title: 'Edit Profile',
        icon: 'pencil'
    },
    {
        key: '02',
        title: 'Help',
        icon: 'help'
    },
    {
        key: '03',
        title: 'Settings',
        icon: 'settings'
    },
    {
        key: '04',
        title: 'Logout',
        icon: 'log-out'
    },
]

const EditItem = ({theKey, onPress, title, icon}) => (
    <TouchableOpacity key={theKey} onPress={onPress}>
        <View style={styles.editItem}>
            <View styles={styles.editItemLeft}>
                <Text styles={styles.itemText}>{title}</Text>
            </View>
            <View styles={styles.editItemRight}>
                <Ionicons name={icon} size={28} color={'grey'}/>
            </View>
        </View>
    </TouchableOpacity>
);

/************ Main Function ************/
const ProfileHome = ({navigation}) => {

    const [name, setName] = useState(auth().currentUser.displayName);
    const [imageUri, setImageUri] = useState('https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png');
    const [pronoun, setPronoun] = useState('');
    const [position, setPosition] = useState('');
    const [firstPromptQuestion, setFirstPromptQuestion] = useState('');
    const [secondPromptQuestion, setSecondPromptQuestion] = useState('');

    // detect if the user navigates back to this page
    React.useEffect(() => {
        var url = 'https://firebasestorage.googleapis.com/v0/b/project-thc8pku.appspot.com/o/' + auth().currentUser.uid + '?alt=media&date=' + new Date().getTime();
        setImageUri(url);
        const profile = firestore().collection(auth().currentUser.uid).doc('profile');
        const unsubscribe = profile.onSnapshot(documentSnapshot => {
            setName(documentSnapshot.data().name);
            setImageUri(documentSnapshot.data().imageUri);
            console.log(documentSnapshot.data().imageUri);
        }
        );

        return unsubscribe;
    }
    , [navigation]);

    useEffect(() => {
        const db = firestore().collection(auth().currentUser.uid).doc('profile');

        db.get().then((doc) => {
            if (doc.exists) {
                setPronoun(doc.data().pronoun);
                setPosition(doc.data().position);
                setFirstPromptQuestion(doc.data().firstPromptQ);
                setSecondPromptQuestion(doc.data().secondPromptQ);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        );
    }
    , []);

    const logout = () => {
        auth()
        .signOut()
        .then(() => console.log('User signed out!'))
        .catch(error => console.log(error));
    }

    const renderItem = ({ item }) => (
        <EditItem key={item.key} onPress={() => {
            item.key === '04' ? logout(navigation) :
            item.key === '01' ? navigation.navigate('Edit Profile', {epronoun: pronoun, eposition: position, efirstPromptQuestion: firstPromptQuestion, esecondPromptQuestion: secondPromptQuestion}) :
            navigation.navigate(item.title);
        }} title={item.title} icon={item.icon}
        />
    );
    
    function getURL() {
        var url = 'https://firebasestorage.googleapis.com/v0/b/project-thc8pku.appspot.com/o/' + auth().currentUser.uid + '?alt=media'
        setImageUri(url);
        return url;
    }

    return (
        <View>
            <View style={styles.profileHeader}>
                {/* Modify this image later on so that the image contains the user. */}
                <Image 
                    source={{
                        uri: imageUri
                    }} 
                    style={{width: 250, height: 250, borderRadius: 500/2}} 
                />
                {/* Modify this text so that it reflects the name of the user. */}
                <Text style={styles.yourName}>
                    Hi, {name}.
                </Text>
            </View>
            <FlatList 
                data = {OPTIONS}
                renderItem = {renderItem}
                keyExtractor = {item => item.key}
            />
        </View>
    );

};

/************ Styling ************/
const styles = StyleSheet.create({

    profileHeader: {
        marginTop: 25,
        alignItems: 'center',
        marginBottom: 40
    },
    yourName: {
        marginTop: 10,
        fontSize: 25
    },
    editItem: {
        backgroundColor: '#D9FDFF',
        elevation: 2,
        marginTop: 1,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    editItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    editItemRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    itemText: {
        fontSize: 15
    }

});

/************ Export ************/
export default ProfileHome;