import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { Chart } from './ChartScreen';

const db = SQLite.openDatabase('budgetApp.db');

function HomeScreen({ navigation }) {
    const [balance, setBalance] = useState(0);
    const [userName, setUsername] = useState('');
    const [chartData, setChartData] = useState([
        {
            name: 'Incomes',
            amount: 0,
            color: '#00cc99',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Expenses',
            amount: 0,
            color: '#ff6666',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ]);

    const fetchBalanceAndChartData = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT username, balance FROM users WHERE id = 1;',
                [],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        setBalance(rows._array[0].balance);
                        setUsername(rows._array[0].username);
                    }
                },
                (_, error) => console.log('Error fetching balance', error)
            );

            tx.executeSql(
                'SELECT SUM(amount) AS totalIncome FROM incomes;',
                [],
                (_, { rows }) => {
                    let totalIncome = rows._array[0].totalIncome || 0;
                    setChartData((prevChartData) => [
                        { ...prevChartData[0], amount: totalIncome },
                        { ...prevChartData[1] },
                    ]);
                },
                (_, error) => {
                    console.log('Error fetching total incomes', error);
                }
            );

            tx.executeSql(
                'SELECT SUM(amount) AS totalExpenses FROM expenses;',
                [],
                (_, { rows }) => {
                    let totalExpenses = rows._array[0].totalExpenses || 0;
                    setChartData((prevChartData) => [
                        { ...prevChartData[0] },
                        { ...prevChartData[1], amount: totalExpenses },
                    ]);
                },
                (_, error) => {
                    console.log('Error fetching total expenses', error);
                }
            );
        });
    };

    useFocusEffect(
        useCallback(() => {
            fetchBalanceAndChartData();
            return () => {};
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome: {userName}</Text>
            <Text style={styles.title}>Current Balance: ${balance.toFixed(2)}</Text>
            <Chart chartData={chartData} />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Incomes')}>
                <Text style={styles.buttonText}>View Incomes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Expenses')}>
                <Text style={styles.buttonText}>View Expenses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Goals')}>
                <Text style={styles.buttonText}>View Goals</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0ffff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333333',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
    },
});

export default HomeScreen;
