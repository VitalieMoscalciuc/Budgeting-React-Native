import React, { useState} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView,TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('budgetApp.db');

function AddIncomeScreen({ navigation }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const handleAddIncome = () => {
        const numericAmount = parseFloat(amount) || 0; // Ensure amount is a number
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO incomes (name, amount, date) values (?, ?, ?)',
                [name, numericAmount, new Date().toISOString()],
                () => console.log('Income added successfully'),
                (_, error) => console.log('Error adding income', error)
            );
            tx.executeSql(
                'UPDATE users SET balance = balance + ? WHERE id = 1;',
                [numericAmount],
                () => {
                    console.log('Balance updated successfully');
                    navigation.navigate('Incomes'); // Navigate after update
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
                <Text style={styles.title}>Add Income</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Source"
                    placeholderTextColor="#999"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setAmount}
                    value={amount}
                    placeholder="Amount"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddIncome}>
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


export default AddIncomeScreen;
