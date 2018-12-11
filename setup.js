const db = require('./dbConnect.js');

let contact =
`
CREATE TABLE IF NOT EXISTS Contacts
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20),
    company TEXT,
    phone VARCHAR(20),
    email VARCHAR(20) UNIQUE
)
;`;

let group =
`
CREATE TABLE IF NOT EXISTS Groups
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30)
)
;`;

let groupContact =
`
CREATE TABLE IF NOT EXISTS GroupContacts
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contactId INTEGER,
    groupId INTEGER,
    FOREIGN KEY(contactId) REFERENCES Contacts(id),
    FOREIGN KEY(groupId) REFERENCES Groups(id)
)
;`;

db.serialize((err) => {
    if (err) {
        console.log(err);
    } else {
        // setup table contact
        db.run(contact, (err) => {
            if (err) {
                console.log('ERR :', err.message);
            } else {
                console.log(`Creating table Contacts`);
            }
        });
        // setup table group
        db.run(group, (err) => {
            if (err) {
                console.log('ERR :', err.message);
            } else {
                console.log(`Creating table Groups`);
            }
        });
        // setup table groupContacts
        db.run(groupContact, (err) => {
            if (err) {
                console.log('ERR :', err.message);
            } else {
                console.log(`Creating table GroupContacts`);
            }
        });
    }
});

db.close((err) => {
    if (err) {
        console.log('ERR :', err.message);
    }
});