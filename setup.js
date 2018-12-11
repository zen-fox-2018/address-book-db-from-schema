
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db')

db.serialize(function(){
    const createTableGroup =   `CREATE TABLE
                                IF NOT EXISTS 'groups'
                                    (
                                    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
                                    'name' TEXT UNIQUE
                                    )`
            db.run(createTableGroup,function(err){
                if(err){
                    console.log(err)
                }
            })
    const createTableKontakGroup = `CREATE TABLE 
                                    IF NOT EXISTS 'groupKontak'
                                    (
                                            'id' INTEGER PRIMARY KEY AUTOINCREMENT,
                                            'groupId' INTEGER NOT NULL,
                                            'kontakId' INTEGER NOT NULL,
                                            FOREIGN KEY (groupId) REFERENCES groups (id),
                                            FOREIGN KEY (kontakId) REFERENCES kontak(id)
                                    )`

            db.run(createTableKontakGroup,function(err){
                if(err){
                    console.log(err)
                }
            })
    
    const createTableKontakPerson = `CREATE TABLE 
                                     IF NOT EXISTS 'kontak'
                                     (
                                            'id' INTEGER PRIMARY KEY AUTOINCREMENT,
                                            'name' varchar(100),
                                            'company' varchar(100),
                                            'phone_number' varchar(20),
                                            'email' TEXT UNIQUE
                                     )`
    
            db.run(createTableKontakPerson,function (err) {
                if(err){
                   console.log(err)
                }
            })

})

module.exports = db