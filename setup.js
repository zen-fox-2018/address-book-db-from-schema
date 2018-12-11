const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contact.db');

let queryKontak = `
            CREATE TABLE IF NOT EXISTS Contacts
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nama text,
                perusahaan text,
                nomorTelepon text,
                email text
            )
`


let queryGrup = `
            CREATE TABLE IF NOT EXISTS Groups
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nama text
            )`

let queryGrupKontak = `
            CREATE TABLE IF NOT EXISTS ContactGroups
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ContactId INTEGER,
                GroupsId INTEGER,
                FOREIGN KEY (ContactId) REFERENCES Contact(id),
                FOREIGN KEY (GroupsId) REFERENCES Groups(id)
            )
`
 

function createTable (nameTable) {
    db.run(nameTable, function(err){
        if(err) {
            console.log(nameTable,err)
        }else{
            console.log(`sucsess`)
        }
    })
}

function runTable () {
    db.serialize(function(){
        createTable(queryKontak)
        createTable(queryGrup)
        createTable(queryGrupKontak)
    })
    db.close()
}

// runTable()

module.exports = db;