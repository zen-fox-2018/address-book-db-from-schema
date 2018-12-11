const db = require('./database/connection.js')

function createTableContacts(){
    let query = `CREATE TABLE 
                        IF NOT EXISTS Contacts (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name text,
                            company text,
                            phone text,
                            email text
                        )`
    db.run(query, function(err){
        if(err){
            console.log('error setup Contacts',err)
        }
        else {
            console.log('sukses setup Contacts')
        }
    })
}

function createTableGrup(){
    let query = `CREATE TABLE
                    IF NOT EXISTS Grup (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name text
                    )`
    db.run(query, function(err){
        if(err){
            console.log('error setup grup', err)
        }
        else {
            console.log('sukses setup grup')
        }
    })
}

function createTableKonjungsi(){
    let query = `CREATE TABLE
                    IF NOT EXISTS ContactGroup (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        contactId INTEGER,
                        grupId INTEGER,
                        FOREIGN KEY (contactId) REFERENCES Contact(id),
                        FOREIGN KEY (grupId) REFERENCES Grup(id)
                    )`
    db.run(query, function(err){
        if(err){
            console.log('error setup konjungsi',err)
        }
        else {
            console.log('sukses setup konjungsi')
        }
    })
}

function runSetup(){
    db.serialize(function(){
        createTableContacts()
        createTableGrup()
        createTableKonjungsi()
    })
}

runSetup()

