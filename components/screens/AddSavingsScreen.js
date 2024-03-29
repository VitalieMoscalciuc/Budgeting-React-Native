import React, {useState} from 'react';
import {KeyboardAvoidingView, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('budgetApp.db');

function AddSavingsScreen({route, navigation}) {
    const {goalId, currentAmount, targetAmount} = route.params;
    const [amountToAdd, setAmountToAdd] = useState('');

    const handleAddSavings = () => {
        const numericAmount = parseFloat(amountToAdd) || 0; // Use amountToAdd, not amount
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE goals SET currentAmount = currentAmount + ? WHERE id = ?',
                [numericAmount, goalId],
                () => console.log('Goal updated successfully'),
                (_, error) => console.log('Error updating Goal', error)
            );
            tx.executeSql(
                'UPDATE users SET balance = balance - ? WHERE id = 1;',
                [numericAmount],
                () => {
                    console.log('Balance updated successfully');
                    navigation.navigate('Goals'); // Go back to GoalsScreen after the update
                },
                (_, error) => console.log('Error updating balance', error)
            );
        });
        navigation.navigate('Goals');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.innerContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Add Savings to Goal</Text>
                <TextInput
                    style={styles.input}
                    value={amountToAdd}
                    onChangeText={setAmountToAdd}
                    placeholder="Amount"
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddSavings}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e0ffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#333333', // Dark text for contrast
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        marginBottom: 20,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '90%',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
    },
});


export default AddSavingsScreen;
