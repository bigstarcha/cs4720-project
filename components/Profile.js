/**
 * This page is for individual messages.
 * 
 * REFERENCES:
 * 
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";


const Profile = ({imageuri, name, age, company, occupation, location, firstPromptQ, firstPromptA, secondPromptQ, secondPromptA}) => {

    return (
        <ScrollView style={styles.profile}>

            {/* TODO: Make the image someone's profile picture */}

            <Image 
                source={{
                    uri: imageuri
                }} 
                style={styles.profilePicture}
            />
            
            {/* Profile Name */}
            <Text style={styles.profileName}>
                {name}
            </Text>

            {/* Text Prompt */}
            <View style={styles.firstPrompt}>
                <Text style={styles.firstPromptQuestion}>
                    {firstPromptQ}
                </Text>
                <Text style={styles.firstPromptResponse}>
                    {firstPromptA}
                </Text>
            </View>
            
            {/* Basic Profile Details */}
            <View style={styles.basicDetails}>

                {/* Age and Company Wrapper */}
                <View style={styles.ageCompanyWrapper}>

                    {/* Age */}
                    <View style={styles.personAge}>
                        <Ionicons name={'person-outline'} size={25} color={'grey'}/>
                        <Text style={{fontSize: 25, marginLeft: 10}}>
                            {age}
                        </Text>
                    </View>

                    {/* Company */}
                    <View style={styles.personCompany}>
                        <Ionicons name={'business-outline'} size={25} color={'grey'}/>
                        <Text style={{fontSize: 25, marginLeft: 10}}>
                            {company}
                        </Text>
                    </View>

                </View>

                {/* Job Title and Location Wrapper */}
                <View style={styles.titleLocationWrapper}>

                    {/* Job Title */}
                    <View style={styles.personJobTitle}>
                        <Ionicons name={'laptop-outline'} size={25} color={'grey'}/>
                        <Text style={{fontSize: 18, marginLeft: 5}}>
                            {occupation}
                        </Text>
                    </View>
                    
                    {/* Location */}
                    <View style={styles.personLocation}>
                        <Ionicons name={'location-outline'} size={25} color={'grey'}/>
                        <Text style={{fontSize: 18, marginLeft: 5}}>
                            {location}
                        </Text>
                    </View>

                </View>

                
                
            </View>

            {/* Voice Prompt (or second text prompt) */}
            <View style={styles.secondPrompt}>
                <Text style={styles.secondPromptQuestion}>
                    {secondPromptQ}
                </Text>
                <Text style={styles.secondPromptResponse}>
                    {secondPromptA}
                </Text>
            </View>

        </ScrollView>
    )

}

const styles = StyleSheet.create({
    profile: {
        marginTop: 25
    },
    profilePicture: {
        width: 400,
        height: 350,
        borderRadius: 15,
        alignSelf: 'center',
        marginBottom: 15
    },
    profileName: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    basicDetails: {
        backgroundColor: '#D9FDFF',
        width: 400,
        height: 90,
        borderRadius: 12,
        alignSelf: 'center',
        marginTop: 15,
        justifyContent: 'center'
    },
    firstPrompt: {
        backgroundColor: '#D9FDFF',
        width: 400,
        height: 180,
        borderRadius: 12,
        alignSelf: 'center',
        marginTop: 15,
        justifyContent: 'center'
    },
    secondPrompt: {
        backgroundColor: '#D9FDFF',
        width: 400,
        height: 180,
        borderRadius: 12,
        alignSelf: 'center',
        marginTop: 15,
        justifyContent: 'center'
    },
    ageCompanyWrapper: {
        marginLeft: 8,
        marginRight: 8,
        paddingBottom: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey'
    },
    titleLocationWrapper: {
        marginTop: 5,
        marginLeft: 8,
        marginRight: 8,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    personAge: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    personCompany: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    personJobTitle: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    personLocation: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    firstPromptQuestion: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginRight: 15
    },
    firstPromptResponse: {
        fontSize: 30,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20
    },
    secondPromptQuestion: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginRight: 15
    },
    secondPromptResponse: {
        fontSize: 30,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20
    }
});

export default Profile;