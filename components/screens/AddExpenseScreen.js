import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity,ScrollView} from 'react-native';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('budgetApp.db');

function AddExpenseScreen({navigation}) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const handleAddExpense = () => {
        const numericAmount = parseFloat(amount) || 0;
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO expenses (name, amount, date) values (?, ?, ?)',
                [name, numericAmount, new Date().toISOString()],
                () => console.log('Expense added successfully'),
                (_, error) => console.log('Error adding expense', error)
            );
            tx.executeSql(
                'UPDATE users SET balance = balance - ? WHERE id = 1;',
                [numericAmount],
                () => {
                    console.log('Balance updated successfully');
                    navigation.navigate('Expenses');
                },
                (_, error) => console.log('Error updating balance', error)
            );
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.innerContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Add Expense</Text>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Source"
            />
            <TextInput
                style={styles.input}
                onChangeText={setAmount}
                value={amount}
                placeholder="Amount"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
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
        color: '#333333',
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

export default AddExpenseScreen;
