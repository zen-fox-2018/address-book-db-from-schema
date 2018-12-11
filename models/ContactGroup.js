const db = require('../db')

class ContactGroup {
    constructor(id, contactId, groupId) {
        this.id = id || 1
        this.contactId = contactId
        this.groupId = groupId
    }

    static findOne(input, cb) {
        let query = `SELECT * FROM ContactGroups WHERE id = ${input}`
        db.get(query, function(err, data) {
            if(err) {
                cb('Error findOne ContactGroups => ', err, null)
            } else {
                let contactGroup = new ContactGroup(null, data.contactId, data.groupId)
                cb(null, contactGroup)
            }
        })
    }

    static findWhere(input, cb) {
        let query = `SELECT * FROM ContactGroups WHERE id = ${input.id}`

        db.all(query, function(err, data) {
            if(err) {
                cb('Error findWhere ContactGroups => ', err, null)
            } else {
                let dataAll = []
                for(let i = 0; i < data.length; i++) {
                    let contactGroup = new ContactGroup(data[i].id, data[i].group_name)
                    dataAll.push(contactGroup)
                }
                cb(null, dataAll)
            }
        })
    }

    static findAll(cb) {
        let query = 
        `SELECT * FROM ContactGroups`

        db.all(query, function(err, data) {
            if(err) {
                cb('Error findAll ContactGroups => ', err, null)
            } else {
                let dataAll = []
                for(let i = 0; i < data.length; i++) {
                    let contactGroups = new ContactGroups(data[i].id, data[i].group_name)
                    dataAll.push(contactGroups)
                }
                cb(null, dataAll)
            }
        })
    }

    create(cb) {
        let query = 
        `INSERT INTO ContactGroups (contactId, groupId)
        VALUES ("${this.contactId}", "${this.groupId}")`

        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    update(input, cb) {
        let query = 
        `UPDATE ContactGroups SET ${input.field} = "${input.value}" WHERE id = ${input.id}`
        
        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    delete(input, cb) {
        let query = `DELETE FROM ContactGroups WHERE id = ${input}`

        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }
}

module.exports = ContactGroup
