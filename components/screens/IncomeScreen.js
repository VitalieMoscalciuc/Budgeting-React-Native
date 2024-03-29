import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';

const db = SQLite.openDatabase('budgetApp.db');

const IncomesScreen = ({ navigation }) => {
    const [incomes, setIncomes] = useState([]);

    const fetchIncomes = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM incomes',
                [],
                (_, { rows: { _array } }) => setIncomes(_array),
                (t, error) => console.log('Error when selecting incomes: ', error)
            );
        });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Add Income')}
                    style={styles.addButton}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useFocusEffect(
        useCallback(() => {
            fetchIncomes();
            return () => {};
        }, [])
    );


    return (
        <View style={styles.container}>
            <FlatList
                data={incomes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text>${item.amount}</Text>
                    </View>
                )}
                contentContainerStyle={{ alignItems: 'center' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0ffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    title: {
        fontSize: 20,
        color: '#333333',
    },
    addButton: {
        marginRight: 10,
        backgroundColor: '#007AFF',
        width: 40,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        color: 'white',
        fontSize: 30,
    },
});


export default IncomesScreen;
