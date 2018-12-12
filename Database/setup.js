const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address-book.db');

function createContact() {
    let query = `
        CREATE TABLE Contact
        (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT,
            Company VARCHAR(255),
            Phone_Number VARCHAR (40),
            Email VARCHAR(40)
        )`
    runCommand(query)
}
function createGroup() {
    let query = `
        CREATE TABLE Groups
        (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT
        )`
    runCommand(query)

}
function createGroupContact() {
    let query =`
        CREATE TABLE GroupsContact
        (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Group_ID INTEGER,
            Contact_ID INTEGER,
            FOREIGN KEY (Group_ID) REFERENCES Groups(ID),
            FOREIGN KEY (Contact_ID) REFERENCES Contact(ID)
        )`
    runCommand(query)

}

function runCommand(query) {
    db.run(query, function(err) {
        if (err) {
            console.log(err)
        }
    })
}
createContact();
createGroup();
createGroupContact();
