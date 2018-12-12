const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

class Group {
  constructor(input) {
    this.id = input.id
    this.name = input.name
  }

  static findAll(cb) {
    let query =
    `
      SELECT * FROM Groups;
    `

    db.all(query, function(err, groupsData) {
      if (err) {
        cb(err)
      }
      else {
        let groups = groupsData
        let result = []
        for (let i = 0; i < groups.length; i++) {
          result.push(new Group(groups[i]))
        }
        cb(null, result)
      }
    })
  }

  static findOne(obj, cb) {
    let query =
    `
      SELECT * FROM Groups
      WHERE ${obj.field} = ${obj.value}
    `
    db.get(query, function(err, groupData) {
      if (err) {
        cb(err)
      }
      else {
        if (groupData === undefined) {
          cb(null, {})
        }
        else {
          let group = new Group(groupData)
          cb(null, group)
        }
      }
    })
  }

  save(cb) {
    let query =
    `
      INSERT INTO Groups
      (name)
      VALUES
      ("${this.name}");
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

  update(obj, cb) {
    let query =
    `
      UPDATE Groups
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
      DELETE FROM Groups
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

  static show(cb) {
    let query =
    `
      SELECT Groups.name, group_concat(Contacts.email) AS members FROM Groups
      LEFT JOIN ContactGroups ON Groups.id = ContactGroups.groupId
      LEFT JOIN Contacts ON ContactGroups.contactId = Contacts.id
      GROUP BY Groups.name ORDER BY Groups.id

    `
    db.all(query, function(err, data) {
      if (err) {
        cb(err)
      }
      else {
        cb(null, data)
      }
    })
  }
}

module.exports = Group