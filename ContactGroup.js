const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

class ContactGroup {
  constructor(input) {
    this.id = input.id
    this.contactId = input.contactId
    this.groupId = input.groupId
  }

  static findAll(obj, cb) {
    let query =
    `
      SELECT * FROM ContactGroups
      WHERE ${obj.field} = ${obj.value};
    `

    db.all(query, function(err, groupContactsData) {
      if (err) {
        cb(err)
      }
      else {
        let groupContacts = groupContactsData
        let result = []
        for (let i = 0; i < groupContacts.length; i++) {
          result.push(new ContactGroup(groupContacts[i]))
        }
        cb(null, result)
      }
    })
  }

  save(cb) {
    const input = Object.values(this).filter(function(element) {
      return element
    })
    let query =
    `
      INSERT INTO ContactGroups
      (contactId, groupId)
      VALUES
      (?, ?);
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

  delete(cb) {
    let query =
    `
      DELETE FROM ContactGroups
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

module.exports = ContactGroup