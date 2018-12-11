const db = require('./db') 
const View = require('./views/View')

let qContact = `
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(150),
    company VARCHAR(100),
    phone VARCHAR(25) UNIQUE,
    email VARCHAR(150) UNIQUE
  )
  `

let qGroup = `
  CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(150)
  )
  `

let ContactGroup = `
  CREATE TABLE IF NOT EXISTS contactgroups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contactId INTEGER ,
    groupId INTEGER, 
    FOREIGN KEY (contactId) REFERENCES contacts(id),
    FOREIGN KEY (groupId) REFERENCES groups(id)
  )
  `

function setUp(query){
  db.run(query, (err) =>{
    if(err) {
      View.disErr(err)
    } else {
      View.display(`create table`)
    }
  })
}

setUp(qContact)
setUp(qGroup)
setUp(ContactGroup)