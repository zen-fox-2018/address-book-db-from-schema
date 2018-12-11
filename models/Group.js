const db = require('../db')

class Group {
  constructor(input) {
    this.id = input.id
    this.name = input.name
    this.member = input.member
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
      INSERT INTO groups (name)
      VALUES (?)
    `
    Group.runQue(query, [this.name] , function( err, dataThis){
      if(err) {
        cb(err)
      } else {
        cb(null, dataThis)
      }
    })
  }

  static findOne(obj, cb) {
    let query = `
      SELECT * FROM ( SELECT groups.id, groups.name , group_concat(contacts.name) as member FROM groups
      left Join contactgroups on groups.id = contactgroups.groupId
      left join contacts on contactgroups.contactId = contacts.id
      group by groups.name
      order by groups.id) WHERE ${obj.where} = ?
    `
    db.get(query, [obj.value] , (err, row) => {
      if(err) {
        cb(err)
      } else {
        if(row) {
          let newGroup = new Group(row)
          cb(null , newGroup)
        } else {
          cb(null, null)
        }
      }
    })
  }
  
  static findAll(cb) {
    let query = `
    SELECT groups.id, groups.name , group_concat(contacts.name) as member FROM groups
    left Join contactgroups on groups.id = contactgroups.groupId
    left join contacts on contactgroups.contactId = contacts.id
    group by groups.name
    order by groups.id`

    db.all(query, (err, rows) => {
      if(err) {
        cb(err)
      } else {
        let temp = []
        for (let i = 0; i < rows.length; i++) {
          let newGroup = new Group(rows[i])
          temp.push(newGroup)
        }
        cb(null , temp)
      }
    })
  }

  update(obj, cb) {
    let query = `
      UPDATE groups SET name = ? WHERE ${obj.where} = ?
    `
    Group.runQue(query, [obj.setVal, this[obj.where]] , (err, data) => {
      if(err) {
        cb(err)
      } else {
        cb(null ,data)
      }
    })
  }

  delete(obj, cb) {
    let quer = `
      DELETE FROM groups WHERE ${obj.where} = ?
    `
    Group.runQue(quer, [this[obj.where]], (err, data) => {
      if(err) {
        cb(err)
      } else {
        cb(null , data)
      }
    })
  }
}
module.exports = Group