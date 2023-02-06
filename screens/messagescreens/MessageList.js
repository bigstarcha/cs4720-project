/**
 * This page allows you to see who liked you and enables you to message your matches.
 * 
 * REFERENCES:
 * 
 * Title: My Second Bucket List App
 * Author: Timothy Cha
 * 
 * Title: React Native Swipeable and Touchable
 * Date: January 26, 2021 (modified)
 * URL: https://stackoverflow.com/questions/38158272/react-native-swipeable-and-touchable
 * 
 * Title: React Native Swipeable
 * URL: https://github.com/jshanson7/react-native-swipeable
 * 
 * Title: React Native Swipeable Example
 * URL: https://github.com/jshanson7/react-native-swipeable/blob/master/example/swipeable-example.js
 * 
 * Title: Calm Beef Jerky
 * Author: Aaron Saunders
 * URL: https://snack.expo.dev/@aaronksaunders/calm-beef-jerky
 */
import React, {useState, useEffect} from 'react';

/************ Import Statements ************/
import {

    View,
    ScrollView,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity

} from 'react-native';
// import Swipeable from 'react-native-gesture-handler/Swipeable';
import Message from '../../components/Message';
import { Swipeable } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';

/************ Auxiliary Code ************/
// This is sample code

// TODO: Set the entries of this list to the messages from the Firebase database
const initialMessages = [
    {name: 'Best Friend', date: new Date(2022, 10, 4), text: 'Golly', key: 0},
    {name: 'Imagi Nation', date: new Date(2023, 1, 25), text: 'Hey Pretty Boy', key: 1},
    {name: 'Other Friend', date: new Date(2022, 1, 7), text: 'Taking an exam rn', key: 2},
    {name: 'That Dude', date: new Date(2022, 0, 23), text: 'Bro do your work', key: 3},
    {name: 'Professor Sherriff', date: new Date(2022, 6, 19), text: 'Did you finish your work?', key: 4},
    {name: 'Other Girl', date: new Date(2023, 4, 3), text: 'Did u cheat on me', key: 5},
]

/************ Main Function ************/
const MessageList = ({ navigation }) => {

    const [matchList, setMatchList] = useState(initialMessages);
    const [swiping, setSwiping] = useState(false);

    useEffect(() => {
        const collectionRef = firestore().collection(auth().currentUser.uid).doc('matches').collection('matches');
        const query = collectionRef.orderBy('date', 'desc').limit(20);

        const unsubscribe = query.onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                date: doc.data().date.toDate(),
            }));
            setMatchList(data);
        }
        );
        return unsubscribe;
    }, [])

    // Do we need these variables?
    let row = [];
    let prevOpenedRow;

    const renderMatch =({item, index}, onClick) => {

        // Why do we need this close row function?
        const closeRow = (index) => {
            console.log('closerow');
            if (prevOpenedRow && prevOpenedRow !== row[index]) {
              prevOpenedRow.close();
            }
            prevOpenedRow = row[index];
        };

        // Render right action
        const renderRightActions = (progress, dragX, onClick) => {
            return (
              <View
                style={{
                  margin: 0,
                  alignContent: 'center',
                  justifyContent: 'center',
                  width: 70,
                }}>
                <Button color="red" onPress={onClick} title="DELETE"></Button>
              </View>
            );
        };

        // Item to return
        return (
            <Swipeable renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, onClick)
              }
              onSwipeableOpen={() => closeRow(index)}
              ref={(ref) => (row[index] = ref)}
              rightOpenValue={-100}
            >
                <TouchableOpacity key={item.uid} onPress={() => {
                    navigation.navigate('Chat', {otheruid: item.uid, name: item.name});
                    }}
                >
                    <Message name={item.name} text={item.text} imageuri={item.imageuri} />
                </TouchableOpacity>
            </Swipeable>
        );

    }

    const deleteMatch = ({ item, index }) => {
        let a = matchList;
        a.splice(index, 1);
        setMatchList([...a]);
    }

    return (
        <View style={styles.main}>
            <Text style={styles.matchHeader}>
                Likes
            </Text>
            <ScrollView style={styles.scrollview} scrollEnabled={!swiping}>
                { matchList.sort(function(a,b){return new Date(b.date) - new Date(a.date)}).map((item) => {
                    return (
                        // Originally, this returned what's inside the return statement of the renderMatch function. So if you want to change it back to that, feel free to do so
                        // You can also take out the swipeable stuff if you want to
                        renderMatch({item, index: matchList.indexOf(item)}, () => deleteMatch({item, index: matchList.indexOf(item)}))
                    );
                })}
            </ScrollView>
        </View>
    );

};

/************ Styling ************/
const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: 20
    },
    matchHeader: {
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 25,
        fontWeight: 'bold'
    }
});

/************ Export ************/
export default MessageList;