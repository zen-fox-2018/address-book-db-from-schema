const db = require('./connection.js')

function createContact(){
    let query =
    `CREATE TABLE Contacts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        company TEXT, 
        number TEXT, 
        email TEXT
    )`

    db.run(query, function(err){
        if(err) throw err
    })
}

function createGroup(){
    let query =
    `CREATE TABLE Groups(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )`

    db.run(query, function(err){
        if(err) throw err
    })
}

function createContactGroup(){
    let query =
    `CREATE TABLE Contacts_Groups(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Groups_Id INTEGER,
        Contacts_Id INTEGER,
        FOREIGN KEY (Groups_Id) REFERENCES Groups(id), 
        FOREIGN KEY (Contacts_Id) REFERENCES Contacts(id)
    )`

    db.run(query, function(err){
        if(err) throw err
    })
}

// createContact()
// createGroup()
// createContactGroup()