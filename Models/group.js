const db = require('../db')
class Group {
    constructor(object) {
        this._id = object.id,
        this._groupname = object.groupname,
        this._contactGroup = object.contacts
    }

    get id() {
        return this._id
    }

    get groupname() {
        return this._groupname
    }

    set groupname(input) {
        this._groupname = input
    }

    static execute(query,input, callback) {
        db.run(query, input, function (err) {
            if (err) {
                callback(err)
            } else {
                callback(null, this)
            }
        })
    }

    static findOne (object, callback) {
        let query = `SELECT * FROM (SELECT Groups.id , groups.group_name , group_concat(Contacts.name) AS contacts
        FROM Groups 
        JOIN ContactGroups
         On Groups.id = ContactGroups.groupId 
         JOIN Contacts
          ON ContactGroups.contactId = Contacts.id
        GROUP BY Groups.group_name)
        WHERE ${object.field} = ?`
        let input = [object.value]
        db.get(query, input, function(err, row) {
            if (err) {
                callback(err)
            } else {
                if (row) {
                    let obj = {
                        id: row.id,
                        groupname: row.group_name,
                        contacts: row.contacts
                    }
                    let group = new Group(obj)
                    callback(null,group)
                } else {
                    callback(null,{})
                }
            }
        })
    }

    static findAll(callback) {
        let query = `
        SELECT Groups.id , groups.group_name , group_concat(Contacts.name) AS contacts
        FROM Groups 
        JOIN ContactGroups 
            On Groups.id = ContactGroups.groupId 
        JOIN Contacts 
            ON ContactGroups.contactId = Contacts.id
        GROUP BY Groups.group_name`
        db.all(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                let result = []
                rows.forEach(person => {
                    let newgroup = new Group (person)
                    result.push(newgroup)
                })
                callback(null,result)
            }
        })
    }
    
    create(callback) {
        let query = `
        INSERT INTO Groups (group_name)
        VALUES (?)`
        let input = Object.values(this).filter(element => element !== undefined)
        // console.log(input)
       Group.execute(query, input, function (err,data) {
            if (err) {
                callback(err)
            } else {
                callback(null,data)
            }
        })
    }

    static countGroup(callback) {
        let query = `SELECT COUNT(*) AS total FROM Groups`
        db.all(query,function(err, rows) {
            if (err) {
                callback(err)
            } else {
                callback(null,rows[0].total)
            }
        })
    }

    delete( field ,callback) {
        let query = `DELETE FROM Groups WHERE ${field} = ?`
        let input = [this[field]]
        Group.execute(query,input, function (err, data){
            if (err) {
                callback(err)
            } else {
                callback(data)
            }
        })
    }

    update(field, callback) {
        let query = `UPDATE Groups SET ${field} = ?
        WHERE id = ?`
        let input = [this.field, this.id]
        Group.execute(query,input, function(err, data) {
            if (err) {
                callback(err)
            } else {
                callback(null,data)
            }
        })
    }
}

module.exports = Group