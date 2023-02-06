/**
 * This page will show you the chat with your match.
 * 
 * REFERENCES:
 * Title: React Native Gifted Chat
 * Author: Farid Safi
 * URL: https://github.com/FaridSafi/react-native-gifted-chat
 * 
 */
import React, {useState, useEffect, useCallback} from 'react';

/************ Import Statements ************/
import {

    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    Keyboard

} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { GiftedChat } from 'react-native-gifted-chat'
// import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

/************ Main Function ************/
const IndividualMessage = ({ route, navigation }) => {

    const { otheruid, name} = route.params;

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        // Send the message to the database
    };

    useEffect(() => {

        // TODO: Set the messages to the messages from the Firebase database
        const collectionRef = firestore().collection(auth().currentUser.uid).doc('messages').collection(otheruid);
        const query = collectionRef.orderBy('createdAt', 'desc').limit(20);

        const unsubscribe = query.onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
                _id: doc.id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user
            }));
            setMessages(data);
        }
        );
        return unsubscribe;

        setMessages([
          {
            _id: 1,
            text: 'Hey! How are you?',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
      }, [])
    
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const { _id, createdAt, text, user } = messages[0];
        firestore().collection(auth().currentUser.uid).doc('messages').collection(otheruid)
        .add({
            _id,
            createdAt,
            text,
            user
        });
        firestore().collection(otheruid).doc('messages').collection(auth().currentUser.uid)
        .add({
            _id: 2,
            createdAt,
            text,
            user
        });

      }, [])

    // Write a function that can allow two users to message each other

    return (
        
        <View style={styles.mainWindow}>
            <Text style={styles.chattingWith}> You are chatting with {name}</Text>
            <GiftedChat 
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: auth().currentUser.uid,
                    name: auth().currentUser.displayName,
                    avatar: auth().currentUser.photoURL
                }}
                onPress={Keyboard.dismiss}
            />
        </View>
    );

};

/************ Styling ************/
const styles = StyleSheet.create({
    mainWindow: {
        flex: 1
    },
    chattingWith: {
        fontSize: 20,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15
    },
    chatRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    chatbox: {
        height: 40,
        fontSize: 20   
    },
    conversation: {
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15
    },
    sendButton: {
        backgroundColor: 'blue',
        fontSize: 20
    }
});

/************ Export ************/
export default IndividualMessage;