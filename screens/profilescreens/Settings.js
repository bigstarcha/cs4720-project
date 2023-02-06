/**
 * This is the settings page.
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
    StyleSheet

} from 'react-native';

/************ Main Function ************/
const Settings = ({ navigation }) => {

    return (
        <View style={styles.setView}>
            <Text style={{fontSize: 25}}>
                Our settings functionality is not being used at this time. Our developers will inform you on future updates. We apologize for the inconvenience.
            </Text>
        </View>
    );

};

/************ Styling ************/
const styles = StyleSheet.create({
    setView: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    }
});

/************ Export ************/
export default Settings;