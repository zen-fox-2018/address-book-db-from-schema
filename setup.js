let db = require(`./db.js`)

let qCreateContact = `CREATE TABLE IF NOT EXISTS Contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    name TEXT,
    company_name TEXT,
    telephone_number INTEGER UNIQUE,
    email TEXT
)`

let qGroup = `CREATE TABLE IF NOT EXISTS Groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    name TEXT
)`

let qCreateContactGroup = `CREATE TABLE IF NOT EXISTS ContactGroups (
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    contact_id INTEGER,
    group_id INTEGER,
    FOREIGN KEY (contact_id) REFERENCES Contacts(id),
    FOREIGN KEY (group_id) REFERENCES Groups(id)
)`

db.serialize(function () {
    db.run(qCreateContact, function (err) {
        err && console.log(`error in create contact db`, err);
            
    })

    db.run(qGroup, function (err) {
        err && console.log(`error in create group db`, err);
            
    })

    db.run(qCreateContactGroup, function (err) {
        err && console.log(`error in create contact group db`, err);
            
    })
})

db.close()
