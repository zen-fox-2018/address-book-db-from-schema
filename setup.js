const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(function() {
  let queryContacts =
  `
    CREATE TABLE Contacts
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(30),
      company VARCHAR(30),
      phone_number VARCHAR(30) UNIQUE,
      email VARCHAR(30)
    );
  `

  let queryGroups =
  `
    CREATE TABLE Groups
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(30) UNIQUE
    );
  `

  let queryContactGroups =
  `
    CREATE TABLE ContactGroups
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contactId INTEGER,
      groupId INTEGER,
      FOREIGN KEY (contactId) REFERENCES Contacts(id),
      FOREIGN KEY (groupId) REFERENCES Groups(id)
    );
  `

  db.run(queryContacts, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(`berhasil membuat tabel Contacts`);
    }
  })

  db.run(queryGroups, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(`berhasil membuat tabel Groups`);
    }
  })

  db.run(queryContactGroups, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(`berhasil membuat tabel ContactGroups`);
    }
  })
})

db.close()