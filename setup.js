const db = require('./db')

let qContacts = `
CREATE TABLE IF NOT EXISTS Contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    company VARCHAR,
    phone VARCHAR,
    email VARCHAR UNIQUE
)`

let qGroups = `
CREATE TABLE IF NOT EXISTS Groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR UNIQUE
)`

let qContacts_Groups = `
CREATE TABLE IF NOT EXISTS Contacts_Groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ContactId INTEGER,
    GroupId INTEGER,
    FOREIGN KEY (ContactId) REFERENCES Contacts(id),
    FOREIGN KEY (GroupId) REFERENCES Groups(id)
)`

db.serialize(() => {
    db.run(qContacts, (err) => {
        err? console.log('err create Contacts'): console.log('success create Contacts');
    })
    db.run(qGroups, (err) => {
        err? console.log('err create Groups'): console.log('success create Groups');
    })
    db.run(qContacts_Groups, (err) => {
        err? console.log('err create Contacts_Groups'): console.log('success create Contacts_Groups');
    })
})