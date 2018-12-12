const db = require('./db/connection');
db.serialize((err) => {
  // db.run("PRAGMA foreign_keys = ON");
  db.run(`DROP TABLE IF EXISTS contacts`);
  db.run(`DROP TABLE IF EXISTS groups`);
  db.run(`DROP TABLE IF EXISTS groupContacts`);
  const qCreateTableContacts = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      company TEXT,
      phoneNumber TEXT,
      email TEXT UNIQUE
    );
  `;

  db.run(qCreateTableContacts, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Successfully created table contacs`);
    }
  })

  const qCreateTableGroups = `
    CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE
    );
  `;

  db.run(qCreateTableGroups, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Successfully created table groups`);
    }
  })

  const qCreateTableGroupContacts = `
    CREATE TABLE IF NOT EXISTS groupContacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contactId INTEGER,
      groupId INTEGER,
      FOREIGN KEY (contactId) REFERENCES contacts(id),
      FOREIGN KEY (groupId) REFERENCES groups(id)
    );
  `;

  db.run(qCreateTableGroupContacts, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Successfully created table contacs`);
    }
  })
})
