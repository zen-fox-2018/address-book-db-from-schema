const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

class Contact {
  constructor(input) {
    this.id = input.id
    this.name = input.name
    this.company = input.company
    this.phone_number = input.phone_number
    this.email = input.email
  }

  static findAll(cb) {
    let query =
    `
      SELECT * FROM Contacts;
    `

    db.all(query, function(err, contactsData) {
      if (err) {
        cb(err)
      }
      else {
        let contacts = contactsData
        let result = []
        for (let i = 0; i < contacts.length; i++) {
          result.push(new Contact(contacts[i]))
        }
        cb(null, result)
      }
    })
  }

  static findOne(obj, cb) {
    let query =
    `
      SELECT * FROM Contacts
      WHERE ${obj.field} = ${obj.value}
    `
    db.get(query, function(err, contactData) {
      if (err) {
        cb(err)
      }
      else {
        if (contactData === undefined) {
          cb(null, {})
        }
        else {
          let contact = new Contact(contactData)
          cb(null, contact)
        }
      }
    })
  }

  save(cb) {
    const input = Object.values(this).filter(function(element) {
      return element
    })
    let query =
    `
      INSERT INTO Contacts
      (name, company, phone_number, email)
      VALUES
      (?, ?, ?, ? );
    `

    db.run(query, input, function(err) {
      if (err) {
        cb(err)
      }
      else {
        cb(null, this)
      }
    })
  }

  update(obj, cb) {
    let query =
    `
      UPDATE Contacts
      SET ${obj.field} = ${obj.value}
      WHERE id = ${this.id};
    `
    db.run(query, function(err) {
      if (err) {
        cb(err)
      }
      else {
        cb(null, this)
      }
    })
  }

  delete(cb) {
    let query =
    `
      DELETE FROM Contacts
      WHERE id = ${this.id};
    `
    db.run(query, function(err) {
      if (err) {
        cb(err)
      }
      else {
        cb(null, this)
      }
    })
  }
}

module.exports = Contact