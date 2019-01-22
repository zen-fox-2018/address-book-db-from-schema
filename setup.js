const db = require('./db')

function createTable(query) {
    db.run(query, function (err) {
        if (err) {
            console.log('error di create table')
        } else {
            console.log('success create table')
        }
    })
}

const tableContact = 
`CREATE TABLE  IF NOT EXISTS Contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100),
    company VARCHAR(50),
    phone  VARCHAR(13) UNIQUE,
    email VARCHAR(50) UNIQUE
)`

const tableGroup  = 
`CREATE TABLE IF NOT EXISTS Groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_name VARCHAR(20)
)`

const tableContactGroups = 
`CREATE TABLE ContactGroups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    groupId INTEGER,
    contactId INTEGER,
    FOREIGN KEY (groupId) REFERENCES Groups(id),
    FOREIGN KEY (contactId) REFERENCES Contacts(id)
)`

db.serialize(function() {
    createTable(tableContact)
    createTable(tableGroup)
    createTable(tableContactGroups)
})