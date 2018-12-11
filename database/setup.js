const db = require('./connection.js');

function dbRun(query) {
  db.run(query, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('table created');
    }
  })
}

db.serialize(() => {
  dbRun('PRAGMA foreign_key = ON');

  let queryContactTable = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(20) UNIQUE,
      company VARCHAR(100),
      phone INTEGER,
      email VARCHAR(50) 
    );`;

  let queryGroupTable = `
    CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50) UNIQUE
    );`;

  let queryConjunctionTable = `
    CREATE TABLE IF NOT EXISTS group_contacts (
      groupId INTEGER,
      contactId INTEGER,
      PRIMARY KEY (groupId, contactId),
      FOREIGN KEY (groupId) REFERENCES groups(id),
      FOREIGN KEY (contactId) REFERENCES contacts(id)
    );`;

  dbRun(queryContactTable);
  dbRun(queryGroupTable);
  dbRun(queryConjunctionTable);
})