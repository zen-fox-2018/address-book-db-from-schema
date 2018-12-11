const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db')

function createContact() {
  var create = `CREATE TABLE IF NOT EXISTS
                Contacts(
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT,
                  telephone TEXT UNIQUE,
                  company TEXT,
                  email TEXT UNIQUE);`;
  db.run(create, function(errSetup) {
    if (errSetup) {
      console.log('Contact:',errSetup);
    }
    else {
      console.log('Contact table created!');
    }
  })
}

function createGroup() {
  var create = `CREATE TABLE IF NOT EXISTS
                Groups(
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT);`;
  db.run(create, function(errSetup) {
    if (errSetup) {
      console.log('Group:',errSetup);
    }
    else {
      console.log('Group table created!');
    }
  })
}

function createConjTable() {
  var create = `CREATE TABLE IF NOT EXISTS
                Conjunction(
                  contactId INTEGER,
                  groupId INTEGER,
                  FOREIGN KEY (contactId) REFERENCES Contacts(id),
                  FOREIGN KEY (groupId) REFERENCES Groups(id));`;
  db.run(create, function(errSetup) {
    if (errSetup) {
      console.log('Conjunction:',errSetup);
    }
    else {
      console.log('Conjunction table created!');
    }
  })
}
db.serialize(() => {
  createContact();
  createGroup();
  createConjTable();
})
db.close();
