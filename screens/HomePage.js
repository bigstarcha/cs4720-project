/**
 * This page will show you your feed based on your preferences.
 * 
 * REFERENCES:
 * 
 * 
 */
import React, {useState, useEffect} from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from '../components/Profile';

/************ Import Statements ************/
import {

    View,
    Text,
    Button,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity

} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/************ Auxiliary Code ************/
const sampleProfiles = [
    {uid: 'timothy', imageUri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png', name: 'Timothy', age: '21', company: 'Cvent', occupation: 'Software Engineer', location: 'Tysons, VA', firstPromptQ: 'I geek out on...', firstPromptA: 'Memes', secondPromptQ: 'I would love to travel to...', secondPromptA: 'South Korea', key: 0},
    {uid: 'Sherriff', imageUri: 'https://pbs.twimg.com/profile_images/1428488947257298948/SWgGiDzo_400x400.png', name: 'Mark', age: '40', company: 'University of Virginia', occupation: 'Project Manager', location: 'Charlottesville, VA', firstPromptQ: 'A typical Sunday for me is...', firstPromptA: 'Grading 3240 Projects', secondPromptQ: 'We should go on a...', secondPromptA: 'Excursion of grading mobile apps', key: 1},
    {uid: 'Elon', imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg', name: 'Elon', age: '51', company: 'Tesla', occupation: 'QA Engineer', location: 'Austin, TX', firstPromptQ: 'Two truths and a lie', firstPromptA: 'I did a Meme Review for PewDiePie, I am the CEO of Twitter, and I got stung by a Jellyfish', secondPromptQ: 'We could be friends if...', secondPromptA: 'You hate Twitter', key: 2},
]

// It could be helpful that we have a useEffect function

/************ Main Function ************/
const HomePage = ({ navigation }) => {

    // if the user doesnt have a display name, go to the profile screen
    // if (auth().currentUser.displayName == null) {
    //     navigation.navigate('Profile');
    // }
    
    const [profileList, setProfileList] = useState(sampleProfiles);

    function getAge(date) {
        var today = new Date();
        var birthDate = new Date(date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

//*
    useEffect(() => {
        const profiles = firestore().collection('profiles');
        //const query = profiles.where('uid', '!=', auth().currentUser.uid);
        //console.log(query);
        const unsubscribe = profiles.onSnapshot(querySnapshot => {
            const list = [];
            //console.log(querySnapshot);
            querySnapshot.forEach(documentSnapshot => {
                console.log(documentSnapshot.data());
                if (documentSnapshot.data().uid == auth().currentUser.uid) {
                    return;
                }
                list.push({
                    uid: documentSnapshot.data().uid,
                    imageUri: documentSnapshot.data().imageUri,
                    name: documentSnapshot.data().name,
                    age: getAge(documentSnapshot.data().dob.toDate()),
                    company: documentSnapshot.data().company,
                    occupation: documentSnapshot.data().position,
                    location: documentSnapshot.data().location,
                    firstPromptQ: documentSnapshot.data().firstPromptQ,
                    firstPromptA: documentSnapshot.data().firstPromptA,
                    secondPromptQ: documentSnapshot.data().secondPromptQ,
                    secondPromptA: documentSnapshot.data().secondPromptA,

                });
            });
            console.log(list);
            setProfileList(list);
        }
        );
        return unsubscribe;
    }, []);//*/


    // This will determine whether your feed is empty or not
    const feed = profileList.length > 0 ? true : false;

    // Call this function when you press the accept button
    const onPressAccept = () => {
        // Add a functionality to add the person to your matches
        firestore().collection(auth().currentUser.uid).doc('matches').collection('matches').doc(profileList[0].uid).set({
            name: profileList[0].name,
            date: new Date(),
            uid: profileList[0].uid,
            imageuri: profileList[0].imageUri,
            text: ''
        });

        // Remove the person from your feed
        let a = profileList;
        a.splice(0, 1);
        setProfileList([...a]);
    }

    // Call this function when you press the decline button
    const onPressDecline = () => {
        // Simply remove the person from your feed
        let a = profileList;
        a.splice(0, 1);
        setProfileList([...a]);
    }

    return (
        <View style={styles.mainPort}>
            {feed ? ( // If your feed is not empty, return profile and touchable buttons
                <>
                <Profile imageuri={profileList[0].imageUri} // My intent is, just keep referencing the first item in the list, remove it and shrink the list
                    name={profileList[0].name}
                    age={profileList[0].age}
                    company={profileList[0].company}
                    occupation={profileList[0].occupation}
                    location={profileList[0].location}
                    firstPromptQ={profileList[0].firstPromptQ}
                    firstPromptA={profileList[0].firstPromptA}
                    secondPromptQ={profileList[0].secondPromptQ}
                    secondPromptA={profileList[0].secondPromptA}
                />
                <View style={styles.bottomButtons}>
                    <TouchableOpacity style={styles.decline} onPress={onPressDecline}>
                        <Ionicons name={'close'} size={48} color={'red'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.accept} onPress={onPressAccept}>
                        <Ionicons name={'heart'} size={48} color={'green'}/>
                    </TouchableOpacity>
                </View>
                </>
            ) : (
                <Text style={styles.emptyFeed}> Your feed is currently empty! Please come back again later. </Text>
            )}
        </View>
    );

};

/************ Styling ************/
const styles = StyleSheet.create({
    mainPort: {
        flex: 1
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 5,
        marginBottom: 15
    },
    decline: {
        elevation: 3,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        width: 64,
        borderRadius: 32
    },
    accept: {
        elevation: 3,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        width: 64,
        borderRadius: 32
    },
    emptyFeed: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10
    }
});

/************ Export ************/
export default HomePage;