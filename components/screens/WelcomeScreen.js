import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('budgetApp.db');

const WelcomeScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState('');

    const initializeUser = () => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE users SET username = ?, balance = ? WHERE id = 1', [username, parseFloat(balance)],
                () => {
                    console.log('User updated successfully');
                    navigation.navigate('Home');
                },
                (t, error) => {
                    console.log('Error when updating user: ', error);
                }
            );
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.label}>Username:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Enter your username"
                />
                <Text style={styles.label}>Initial Balance:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setBalance}
                    value={balance}
                    placeholder="Enter your initial balance"
                    keyboardType="numeric"
                />
                <Button title="Get Started" onPress={initializeUser} />
            </View>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    innerContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 15,
        elevation: 2,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
});



export default WelcomeScreen;
