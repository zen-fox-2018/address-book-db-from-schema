const db = require('../db')
class Contact {
  constructor(input) {
    this.id = input.id
    this.name = input.name
    this.company = input.company
    this.phone = input.phone
    this.email = input.email
    this.groups = input.groupsName || 'none'
  }

  static runQue(query,value, cb) {
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
      INSERT INTO contacts (name, company, phone, email)
      VALUES (?, ?, ?, ?)
    `
    Contact.runQue(query, [this.name, this.company, this.phone, this.email] , function(err,dataThis){
      if(err) {
        cb(err)
      } else {
        cb(null, dataThis)
      }
    })
  }

  static findOne(obj, cb) {
    let query = `
      SELECT * FROM (SELECT contacts.id,contacts.name, company, phone, email, group_concat(groups.name) As groupsName FROM contacts 
      left Join contactgroups on contacts.id = contactgroups.contactId 
      left join groups on contactgroups.groupId = groups.id
      group by contacts.name
      order by contacts.id
      ) WHERE ${obj.where} = ?
    `
    db.get(query, [obj.value] , (err, row) => {
      if(err) {
        cb(err)
      } else {
        if(row) {
          let newCon = new Contact(row)
          cb(null , newCon)
        } else {
          cb(null, null)
        }
      }
    })
  }
  
  static findAll(cb) {
    let query = `
    SELECT contacts.id,contacts.name, company, phone, email, group_concat(groups.name) As groupsName FROM contacts 
    left Join contactgroups on contacts.id = contactgroups.contactId 
    left join groups on contactgroups.groupId = groups.id
    group by contacts.name 
    order by contacts.id`

    db.all(query, (err, rows) => {
      if(err) {
        cb(err)
      } else {
        let temp = []
        for (let i = 0; i < rows.length; i++) {
          let newContact = new Contact(rows[i])
          temp.push(newContact)
        }
        cb(null , temp)
      }
    })
  }

  update(obj, cb) {
    let query = `
      UPDATE contacts SET ${obj.set} = ? WHERE ${obj.where} = ?
    `
    Contact.runQue(query, [obj.setVal, this[obj.where]] , (err, data) => {
      if(err) {
        cb(err)
      } else {
        cb(null ,data)
      }
    })
  }

  delete(obj, cb) {
    let quer = `
      DELETE FROM contacts WHERE ${obj.where} = ?
    `
    Contact.runQue(quer, [this[obj.where]], (err, data) => {
      if(err) {
        cb(err)
      } else {
        cb(null , data)
      }
    })
  }
}
module.exports = Contact