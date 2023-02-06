/**
 * This page is for individual messages.
 * 
 * REFERENCES:
 * Title: 👉 Build your first React Native app - Todo List Tutorial Part 1
 * Author: Made With Matt
 * Date: January 26, 2021
 * URL: https://www.youtube.com/watch?v=0kL6nhutjQ8&ab_channel=MadeWithMatt
 * 
 * Title: Text
 * URL: https://reactnative.dev/docs/text
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


const Message = ({name, text, imageuri}) => {

    // For the checkbox
    const [toggled, setToggled] = React.useState(false);
    // const [tasks, setTasks] = useState([]);
    // const [tasksDone, setTasksDone] = useState([]);

    return (
        <View style={styles.item}>
            <Image 
                source={{
                    uri: imageuri
                }} 
                style={{width: 60, height: 60, borderRadius: 120/2, marginLeft: 5}} 
            />
            <View style={styles.chatZone}>
                <Text style={styles.itemName}>{name}</Text>
                <Text style={styles.itemText}>{text}</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#D9FDFF',
        padding: 12,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 2
    },
    chatZone: {
        marginLeft: 20,
        alignItems: 'flex-start'
    },
    itemName: {
        fontSize: 20
    },
    itemText: {
        fontSize: 15
    }
});

export default Message;