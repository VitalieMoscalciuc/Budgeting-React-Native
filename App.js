import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './components/screens/HomeScreen';
import AddIncomeScreen from './components/screens/AddIncomeScreen';
import AddExpenseScreen from './components/screens/AddExpenseScreen';
import AddGoalScreen from './components/screens/AddGoalScreen';
import WelcomeScreen from "./components/screens/WelcomeScreen";
import {database} from "./components/db/db";
import IncomesScreen from "./components/screens/IncomeScreen";
import ExpenseScreen from "./components/screens/ExpenseScreen";
import GoalsScreen from "./components/screens/GoalScreen";
import AddSavingsScreen from "./components/screens/AddSavingsScreen";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('budgetApp.db');

const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        database.initDB();
    }, []);


    const [isLoading, setIsLoading] = useState(true);
    const [userExists, setUserExists] = useState(false);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM users',
                [],
                (_, {rows}) => {
                    if (rows.length > 0) {
                        setUserExists(true); // User exists
                    }
                    setIsLoading(false); // Done loading
                },
                (_, error) => {
                    console.log('Error checking user data:', error);
                    setIsLoading(false);
                }
            );
        });
    }, []);

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }


    return (
        <>
            <NavigationContainer style={styles.container}>
                <Stack.Navigator>
                    {userExists ? (
                        // User exists, go to Home
                        <>
                            <Stack.Screen name="Home" component={HomeScreen}/>
                        </>
                    ) : (
                        // No user found, go to Welcome
                        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                    )}
                    <Stack.Screen name="Incomes" component={IncomesScreen}/>
                    <Stack.Screen name="Expenses" component={ExpenseScreen}/>
                    <Stack.Screen name="Goals" component={GoalsScreen}/>
                    <Stack.Screen name="Add Income" component={AddIncomeScreen}/>
                    <Stack.Screen name="Add Expense" component={AddExpenseScreen}/>
                    <Stack.Screen name="Add Goal" component={AddGoalScreen}/>
                    <Stack.Screen name="Add Savings" component={AddSavingsScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
