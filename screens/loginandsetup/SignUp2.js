/**
 * This is the main page for your profile and it allows you to modify your preferences.
 * 
 * REFERENCES:
 * Title: Enable to Set Date Only if it 18 Years Old and Above
 * Date: 2020 (Modified)
 * URL: https://stackoverflow.com/questions/52759908/react-datepicker-enable-to-set-date-only-if-it-18-years-old-and-above
 * 
 * Title: React Native Dropdown Select List
 * URL: https://www.npmjs.com/package/react-native-dropdown-select-list
 * 
 * Title: React Native Modal Date Picker
 * URL: https://www.npmjs.com/package/react-native-modal-datetime-picker
 * 
 * Title: How to get the current location in React Native | React Native Geolocation
 * URL: https://www.youtube.com/watch?v=EZJT3aN_38g&ab_channel=TechnicalRajni
 * 
 * Title: React Native Geolocation
 * URL: https://aboutreact.com/react-native-geolocation/
 */
import React, {useState, useEffect} from 'react';

/************ Import Statements ************/
import {

    View,
    Text,
    Button,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    PermissionsAndroid

} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SelectList } from 'react-native-dropdown-select-list'
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Geolocation from '@react-native-community/geolocation';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';


/************ Main Function ************/
const SignUp2 = ({ navigation }) => {


    // Hooks
    const [dob, setDOB] = useState(new Date("2001-01-01")); // Date of birth (Change useState param to user's date of birth)
    const [pronoun, setPronoun] = useState(''); // Pronouns
    const [position, setPosition] = useState(''); // Position
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Date picker visibility
    const [firstPromptQuestion, setFirstPromptQuestion] = useState(''); // First prompt question
    const [secondPromptQuestion, setSecondPromptQuestion] = useState(''); // Second prompt question
    const [firstPromptAnswer, setFirstPromptAnswer] = useState(''); // First prompt answer
    const [secondPromptAnswer, setSecondPromptAnswer] = useState(''); // Second prompt answer
    const [name, setName] = useState(''); // Name
    const [company, setCompany] = useState(''); // Company

    // Image hooks
    const [image, setImage] = useState('https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png'); // Change to current image

    // Geolocation hooks
    const [currentLongitude, setCurrentLongitude] = useState(''); // Longitude
    const [currentLatitude, setCurrentLatitude] = useState(''); // Latitude
    const [locationStatus, setLocationStatus] = useState(''); // Location status
    const [location, setLocation] = useState('Getting Location'); // Location

    useEffect(() => {
        // Check for the permission
        if (Platform.OS === 'ios') {
            getOneTimeLocation();
            subscribeLocationLocation();
        } else {
            async function requestLocationPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: "Location Access Required",
                            message: "This App needs to Access your location"
                        }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        getOneTimeLocation();
                        subscribeLocationLocation();
                    } else {
                        alert("Permission Denied");
                    }
                } catch (err) {
                    console.warn(err)
                }
            }
            requestLocationPermission();
        }
    }, []);

    // Get location
    const getOneTimeLocation = () => {
        setLocationStatus("Getting Location ...");
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                setLocationStatus("You are Here");
                //getting the Longitude from the location json
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Latitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                setCurrentLatitude(currentLatitude);
                setCurrentLongitude(currentLongitude);
                console.log('Current latitude ', currentLatitude);
                console.log('Current longitude ', currentLongitude);
                // call google api to get City, State
                fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + currentLatitude + ',' + currentLongitude + '&sensor=true&key=AIzaSyCnpY6n5CUtFxJuSPSmDb6plEna59_Dm2U')
                    .then((response) => response.json())
                    .then((responseJson) => {
                        const city = responseJson.results[0].address_components[3].long_name;
                        const state = responseJson.results[0].address_components[4].long_name;
                        setLocation(city + ', ' + state);
                        console.log(location);
                    }
                    );
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
            }
        );
    };

    const subscribeLocationLocation = () => {
        this.watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change
                setLocationStatus("You are Here");
                console.log(position);
                //getting the Longitude from the location json
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Latitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                setCurrentLatitude(currentLatitude);
                setCurrentLongitude(currentLongitude);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                distanceFilter: 1,
            }
        );
    };

    // Camera functions
    async function openCamera() {
        const result = await launchCamera({});
        console.log('Response = ', result);

        // Handle the response here, potential error handling
        if (result.assets == undefined) {
            return;
        }
        setImage(result.assets[0].uri);
    }

    async function openGallery() {
        const result = await launchImageLibrary({});
        // Handle the response here, potential error handling
        // if result.assets is undefined, then the user cancelled the image picker, so return
        if (result.assets == undefined) {
            return;
        }
        setImage(result.assets[0].uri);
    }

    // Edit profile function
    const editProfile = () => {
        // check if all fields are filled
        if (name == '' || dob == '' || pronoun == '' || position == '' || company == '' || firstPromptQuestion == '' || firstPromptAnswer == '' || image == null) {
            alert('Please fill in all fields');
            // tell the user which fields are missing
            if (name == '') {
                alert('Please enter your name');
            }
            else if (dob == '') {
                alert('Please enter your date of birth');
            }
            else if (pronoun == '') {
                alert('Please enter your pronouns');
            }
            else if (position == '') {
                alert('Please enter your position');
            }
            else if (company == '') {
                alert('Please enter your company');
            }
            else if (firstPromptQuestion == '') {
                alert('Please enter your first prompt question');
            }
            else if (firstPromptAnswer == '') {
                alert('Please enter your first prompt answer');
            }

            return;
        }

        // upload the image to Firebase Storage
        const pathToImage = image;
        const reference = storage().ref(auth().currentUser.uid);
        const task = reference.putFile(pathToImage);
        task.then(() => {
            console.log('Image uploaded to the bucket!');
            const url = storage().ref(auth().currentUser.uid).getDownloadURL();
            console.log('Image url: ', url);
            const newImageUri = 'https://firebasestorage.googleapis.com/v0/b/project-thc8pku.appspot.com/o/' + auth().currentUser.uid + '?alt=media&date=' + new Date().getTime();
            // update user's profile in Firestore, but only the image
            firestore().collection(auth().currentUser.uid).doc('profile').update({
                imageUri: newImageUri
            })
            
            .then(() => {
                console.log('Profile updated!');
            }
            );
            firestore().collection('profiles').doc(auth().currentUser.uid).update({
                imageUri: newImageUri
            })
            .then(() => {
                console.log('Profile updated!');
            }
            );
        }
        );
        
        // Also update user's profile in Firebase
        firestore().collection(auth().currentUser.uid).doc('profile').set({
            uid: auth().currentUser.uid,
            name: name,
            dob: dob,
            pronoun: pronoun,
            position: position,
            firstPromptQ: firstPromptQuestion,
            firstPromptA: firstPromptAnswer,
            secondPromptQ: secondPromptQuestion,
            secondPromptA: secondPromptAnswer,
            company: company,
            location: location
            
        })
        .then(() => {
            console.log('Profile updated!');
        }
        );

        firestore().collection('profiles').doc(auth().currentUser.uid).set({
            uid: auth().currentUser.uid,
            name: name,
            dob: dob,
            pronoun: pronoun,
            position: position,
            firstPromptQ: firstPromptQuestion,
            firstPromptA: firstPromptAnswer,
            secondPromptQ: secondPromptQuestion,
            secondPromptA: secondPromptAnswer,
            company: company,
            location: location
            
        })
        .then(() => {
            console.log('Profile updated!');
        }
        );
        // set the display name to the name the user entered
        auth().currentUser.updateProfile({
            displayName: name
        })
        .then(() => {
            console.log('Display name updated!');
        }
        );

        navigation.navigate('Main Page');
    }

    // Other functions
    const showDatePicker = () => {
        console.log('Date of birth is ' + dob)
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmDOB = (date) => {
        hideDatePicker();
        setDOB(date);
    };

    // Dropdown menu list for pronouns
    const pronouns = [
        {key: 0, value: 'He/Him'},
        {key: 1, value: 'She/Her'},
        {key: 2, value: 'They/Them'}
    ]

    // Dropdown menu list for positions
    const positions = [
        {key: 0, value: 'Software Engineer'},
        {key: 1, value: 'Security Engineer'},
        {key: 2, value: 'Security Analyst'},
        {key: 3, value: 'DevOps Engineer'},
        {key: 4, value: 'Data Scientist'},
        {key: 5, value: 'Data Engineer'},
        {key: 6, value: 'Machine Learning Engineer'},
        {key: 7, value: 'Product Manager'},
        {key: 8, value: 'Project Manager'},
        {key: 9, value: 'Business Analyst'},
        {key: 10, value: 'UX Designer'},
        {key: 11, value: 'UI Designer'},
        {key: 12, value: 'QA Engineer'}
    ]

    // Dropdown menu list for first prompt questions
    const firstPromptQuestions = [
        {key: 0, value: 'A typical Sunday for me is...'},
        {key: 1, value: 'My favorite hobby is...'},
        {key: 2, value: 'I geek out on...'},
        {key: 3, value: 'Two truths and a lie'}
    ]

    // Dropdown menu list for second prompt questions
    const secondPromptQuestions = [
        {key: 0, value: 'We should go on a...'},
        {key: 1, value: 'We could be friends if...'},
        {key: 2, value: 'I\'m looking for someone who...'},
        {key: 3, value: 'I would love to travel to...'}
    ]

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    return (
        <View style={styles.mainView}>

            <ScrollView style={styles.scrollView}>

                {/** Profile Image */}
                <View style={styles.profileHeader}>
                    {/* Modify this image later on so that the image contains the user. */}
                    <Image 
                        source={{
                            uri: image
                        }} 
                        style={{width: 200, height: 200, borderRadius: 400/2}} 
                    />

                    <View style={styles.imageButtons}>
                        <TouchableOpacity
                            onPress={openGallery}
                            style={[
                                styles.selectButtonContainer,
                            ]}
                        >
                            <Ionicons name={'image-outline'} size={25} color={'grey'}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={openCamera}
                            style={[
                                styles.selectButtonContainer,
                            ]}
                        >
                            <Ionicons name={'camera-outline'} size={25} color={'grey'}/>
                        </TouchableOpacity>
                    </View>

                </View>

                {/** Profile Name */}
                <View style={styles.profileName}>
                    <Text style={{fontSize: 20, marginBottom: 5}}>
                        Name
                    </Text>
                    <TextInput
                        style={{ height: 40, fontSize: 15, borderColor: 'gray', borderBottomWidth: 0.5 }}
                        onChangeText={text => setName(text)}
                        value={name} // fix this so that when I delete the name, it doesn't reset to Timothy
                        keyboardType="default"
                        maxLength={15}
                        placeholder={'First Name'}
                    />
                </View>

                {/** Profile Date of Birth */}
                <View style={styles.profileDOB}>
                    <View>
                        <Text style={{fontSize: 20, marginBottom: 2}}>
                            Date of Birth
                        </Text>
                        <Text style={{fontSize: 12, marginBottom: 8}}>
                            Click the button to change your DOB
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.dobPicker} onPress={showDatePicker}>
                        <Text style={{fontSize: 20, marginBottom: 5}}>
                            {moment(dob).format('MMMM Do, YYYY')}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        date={dob}
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmDOB}
                        onCancel={hideDatePicker}
                        maximumDate={moment(new Date()).subtract(18, 'years').toDate()}
                        minimumDate={new Date("1900-0-1")}
                    />
                </View>

                {/** Profile Pronouns */}
                <View style={styles.profilePronouns}>
                    <Text style={{fontSize: 20, marginBottom: 5}}>
                        Pronouns
                    </Text>
                    <SelectList 
                        setSelected={(val) => setPronoun(val)} 
                        data={pronouns} 
                        search={false}
                        save="value"
                    />
                </View>

                {/** Profile Position */}
                <View style={styles.profilePosition}>
                    <Text style={{fontSize: 20, marginBottom: 5}}>
                        Position
                    </Text>
                    <SelectList 
                        setSelected={(val) => setPosition(val)} 
                        data={positions} 
                        search={false}
                        save="value"
                    />
                </View>

                {/** Profile Company */}
                <View style={styles.profileCompany}>
                    <Text style={{fontSize: 20, marginBottom: 5}}>
                        Company
                    </Text>
                    <TextInput
                        style={{ height: 40, fontSize: 15, borderColor: 'gray', borderBottomWidth: 0.5 }}
                        onChangeText={text => setCompany(text)}
                        value={company}
                        keyboardType="default"
                        placeholder='Company Name'
                    />
                </View>

                {/** Profile Location */}
                <View style={styles.profileLocation}>
                    <Text style={{fontSize: 20, marginBottom: 5}}>
                        Location
                    </Text>
                    <Text style={{fontSize: 15}}>
                        {location}
                    </Text>
                </View>

                {/** Profile First prompt and answer */}
                <View>
                    <Text style={{fontSize: 20, marginBottom: 5}}>
                        Prompts
                    </Text>
                    <Text style={{fontSize: 18, marginBottom: 5}}>
                        Choose a text prompt.
                    </Text>
                    <SelectList 
                        setSelected={(val) => setFirstPromptQuestion(val)}
                        data={firstPromptQuestions}
                        search={false}
                        save="value"
                    />
                    <Text style={{fontSize: 15, marginBottom: 5, marginTop: 5}}>
                        Write your response here.
                    </Text>
                    <TextInput
                        style={{ height: 40, fontSize: 15, borderColor: 'gray', borderBottomWidth: 0.5 }}
                        onChangeText={text => setFirstPromptAnswer(text)}
                        value={firstPromptAnswer}
                        placeholder={'Your response here...'}
                        keyboardType="default"
                    />
                    <Text style={{fontSize: 18, marginBottom: 5, marginTop: 10}}>
                        Choose another prompt.
                    </Text>
                    <SelectList
                        setSelected={(val) => setSecondPromptQuestion(val)} 
                        data={secondPromptQuestions}
                        search={false}
                        save="value"
                    />
                    <Text style={{fontSize: 15, marginBottom: 5, marginTop: 5}}>
                        Write your response here.
                    </Text>
                    <TextInput
                        style={{ height: 40, fontSize: 15, borderColor: 'gray', borderBottomWidth: 0.5 }}
                        onChangeText={text => setSecondPromptAnswer(text)}
                        value={secondPromptAnswer}
                        placeholder={'Your response here...'}
                        keyboardType="default"
                    />
                    {/** Need to add some functionality to record */}
                </View>

            </ScrollView>

            <TouchableOpacity style={styles.updateProfileButton} onPress={editProfile} >
                <Text style={{fontSize: 25}}>
                    Complete Profile
                </Text>
            </TouchableOpacity>

        </View>
    );

};

/************ Styling ************/
const styles = StyleSheet.create({
    mainView: {
        flex: 1        
    },
    scrollView: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    profileHeader: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    imageButtons: {
        marginTop: 10,
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileName: {
        marginBottom: 15
    },
    profileDOB: {
        marginBottom: 15
    },
    profilePronouns: {
        marginBottom: 15
    },
    profilePosition: {
        marginBottom: 15
    },
    profileCompany: {
        marginBottom: 15
    },
    profileLocation: {
        marginBottom: 15
    },
    dobPicker: {
        height: 40,
        width: 220,
        backgroundColor: '#D9FDFF',
        borderRadius: 12,
        elevation: 2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    updateProfileButton: {
        height: 45,
        width: 250,
        backgroundColor: '#D9FDFF',
        borderRadius: 12,
        elevation: 2,
        marginBottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

/************ Export ************/
export default SignUp2;