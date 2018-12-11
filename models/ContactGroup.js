const db = require('../db')

class ContactGroup {
  constructor (input) {
    this.id = input.id
    this.contactId = input.contactId
    this.groupId = input.groupId
  }

  static runQue(query, value, cb) {
    db.run(query, value, function(err){
      if(err) {
        cb(err)
      } else{
        cb(null, this)
      }
    })
  }
  
  save(cb) {
    let query = `
      INSERT INTO contactgroups (contactId, groupId)
      VALUES (?, ?)
    `
    ContactGroup.runQue(query, [this.contactId, this.groupId] , function( err, dataThis){
      if(err) {
        cb(err)
      } else {
        cb(null, dataThis)
      }
    })
  }

  static findOne(obj, cb) {
    let query = `
      SELECT * FROM contactgroups WHERE ${obj.where} = ?
    `
    db.get(query, [obj.value] , (err, row) => {
      if(err) {
        cb(err)
      } else {
        if(row) {
          let newCGroup = new ContactGroup(row)
          cb(null , newCGroup)
        } else {
          cb(null, null)
        }
      }
    })
  }
  
  static findWhere(obj, cb) {
    let query = `
    SELECT * FROM contactgroups WHERE ${obj.where} = ?
  `
  db.all(query, [obj.value] , (err, rows) => {
    if(err) {
      cb(err)
    } else {
      if(rows) {
        let temp = []
        for (let i = 0; i < rows.length; i++) {
          let newCGroup = new ContactGroup(rows[i])
          temp.push(newCGroup)
        }
        cb(null , temp)
      } else {
        cb(null, null)
      }
    }
  })
  }

  static findAll(cb) {
    let query = `
    SELECT * FROM contactgroups`

    db.all(query, (err, rows) => {
      if(err) {
        cb(err)
      } else {
        let temp = []
        for (let i = 0; i < rows.length; i++) {
          let newCGroup = new ContactGroup(rows[i])
          temp.push(newCGroup)
        }
        cb(null , temp)
      }
    })
  }

  static update(obj, cb) {
    let query = `
      UPDATE contactgroups SET ${obj.set} = ? WHERE ${obj.where} = ?
    `
    ContactGroup.runQue(query, [obj.setVal, obj.whereVal] , (err, data) => {
      if(err) {
        cb(err)
      } else {
        cb(null ,data)
      }
    })
  }

  delete(obj, cb) {
    let quer = `
      DELETE FROM contactgroups WHERE ${obj.where} = ?
    `
    ContactGroup.runQue(quer, [this[obj.where]], (err, data) => {
      if(err) {
        cb(err)
      } else {
        cb(null , data)
      }
    })
  }
}
module.exports = ContactGroup