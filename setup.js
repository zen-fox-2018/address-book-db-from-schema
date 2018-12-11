const db = require('./Database/Connector')

db.serialize(()=> {
    let qCreateContact = `CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        company VARCHAR(100),
        phone_number TEXT,
        email TEXT);`
    db.run(qCreateContact,(err)=> {
        if(err) console.log(err);
        else console.log(`Success create table contacts`);
        
    })
    let qCreateGroup = `CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50));`
    db.run(qCreateGroup,(err)=> {
        if(err) console.log(err);
        else console.log(`Success create table groups`);
        
    })
    let qCreateContactGroups = `CREATE TABLE IF NOT EXISTS contactgroups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        group_id INTEGER,
        contact_id INTEGER,
        FOREIGN KEY (group_id) REFERENCES groups(id),
        FOREIGN KEY (contact_id) REFERENCES contacts(id)
        );`
    db.run(qCreateContactGroups, (err)=> {
        if(err) console.log(err);
        else console.log(`Success create table contactgroups`);
        
    })
    
})