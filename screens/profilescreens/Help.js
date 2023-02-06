/**
 * This is help page.
 * 
 * REFERENCES:
 * 
 * 
 */
import React from 'react';

/************ Import Statements ************/
import {

    View,
    Text,
    Button,
    ScrollView,
    StyleSheet

} from 'react-native';

/************ Main Function ************/
const Help = ({ navigation }) => {

    return (
        <View>
            
            <ScrollView style={styles.scrollView}>

                {/** Matching */}
                <View style={styles.howtoMatch}>
                    <Text style={{fontSize: 25, marginBottom: 5}}>
                        How to Match
                    </Text>
                    <Text style={{fontSize: 18}}>
                        To like someone's profile, you can tap the green heart button on their Profile on your Discover feed. If they also like your profile, you will be matched with them. New matches will appear on your messages page. You can then chat with them. Likewise, to dismiss someone's profile, simply tap the red X button on their Profile on your Discover feed.
                    </Text>
                </View>

                {/** Unmatching */}
                <View style={styles.howtoUnmatch}>
                    <Text style={{fontSize: 25, marginBottom: 5}}>
                        How to Unmatch
                    </Text>
                    <Text style={{fontSize: 18}}>
                        Unfortunately, we currently do not support unmatching at this time. We are working on this feature and will update you when it is available.
                    </Text>
                </View>

                {/** Messaging */}
                <View style={styles.howtoMessage}>
                    <Text style={{fontSize: 25, marginBottom: 5}}>
                        How to Message
                    </Text>
                    <Text style={{fontSize: 18}}>
                        Click the messages icon on the bottom left to see all of your matches. To message someone, simply tap on their profile. You can then send them a message.
                    </Text>
                </View>

                {/** Edit Profile */}
                <View style={styles.howtoEditProfile}>
                    <Text style={{fontSize: 25, marginBottom: 5}}>
                        How to Edit Profile
                    </Text>
                    <Text style={{fontSize: 18}}>
                        Click the person icon on the bottom right to view your profile options. To edit your profile, simply click on the Edit Profile button.
                    </Text>
                </View>

            </ScrollView>

        </View>
    );

};

/************ Styling ************/
const styles = StyleSheet.create({

    scrollView: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    howtoMatch: {
        marginBottom: 15
    },
    howtoUnmatch: {
        marginBottom: 15
    },
    howtoMessage: {
        marginBottom: 15
    },
    howtoEditProfile: {
        marginBottom: 15
    }


});

/************ Export ************/
export default Help;