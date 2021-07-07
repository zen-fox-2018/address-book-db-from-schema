const db = require('./db')

db.serialize(() => {
    const qCreateContactTable = 
    `CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARHCHAR(100),
        company VARCHAR(100),
        phone VARHCAR(20),
        email VARCHAR(100) UNIQUE
    )`

    db.run(qCreateContactTable, (err) => {
        if(err) {
            console.log('Error Create Table Contacts', err)
        } else {
            console.log('Success Create Table Contacts')
        }
    })

    const qCreateGroupTable = 
    `CREATE TABLE IF NOT EXISTS Groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        group_name UNIQUE
    )`

    db.run(qCreateGroupTable, (err) => {
        if(err) {
            console.log('Error Create Table Groups', err)
        } else {
            console.log('Success Create Table Groups')
        }
    })

    const qCreateContactGroupsTable = 
    `CREATE TABLE IF NOT EXISTS ContactGroups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contactId INTEGER,
        groupId INTEGER,
        FOREIGN KEY (contactId) REFERENCES Contacts (id),
        FOREIGN KEY (groupId) REFERENCES Groups (id)
    )`

    db.run(qCreateContactGroupsTable, (err) => {
        if(err) {
            console.log('Error Create Table ContactGroups', err)
        } else {
            console.log('Success Create Table ContactGroups')
        }
    })

})
