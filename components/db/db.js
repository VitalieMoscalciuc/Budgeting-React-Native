import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('budgetApp.db');

const initDB = () => {
    db.transaction(tx => {
        //clear
        // tx.executeSql('DROP TABLE IF EXISTS goals;', [], null, (_, error) => console.log(error));
        // tx.executeSql('DROP TABLE IF EXISTS incomes;', [], null, (_, error) => console.log(error));
        // tx.executeSql('DROP TABLE IF EXISTS expenses;', [], null, (_, error) => console.log(error));
        // tx.executeSql('DROP TABLE IF EXISTS users;', [], null, (_, error) => console.log(error));


        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, targetAmount REAL NOT NULL, currentAmount REAL NOT NULL);'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS incomes (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL);'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL);'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, balance REAL NOT NULL, username TEXT);'
        );
    }, (err) => console.log('DB Error: ', err));
};


export const database = {
    initDB,
};
