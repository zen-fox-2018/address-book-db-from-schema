
const db = require("./db");

db.serialize(function() {
    let createTableContacts = `CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        company TEXT,
        phone_number VARCHAR (13),
        email VARCHAR(20) UNIQUE
    );`

    db.run(createTableContacts, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Success created contact table!")
        }
    });

    let createTableGroups = `CREATE TABLE IF NOT EXISTS Groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        group_name TEXT
    );`

    db.run(createTableGroups, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Success created table for groups!")
        }
    })

    let createTableConjunction = `CREATE TABLE IF NOT EXISTS groups_contacts (
        groupsId INTEGER,
        contactsId INTEGER,
            FOREIGN KEY (groupsId) REFERENCES Groups(id),
            FOREIGN KEY (contactsId) REFERENCES Contacts(id)
    );`

    db.run(createTableConjunction, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("You have successfully create groups_contacts table!")
        }
    });
})