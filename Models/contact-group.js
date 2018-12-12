
const db = require("../db");

class ContactGroups {
    constructor(id, groupsId, contactsId) {
        this.id = id;
        this.groupsId = groupsId;
        this.contactsId = contactsId;
    }

    static finOne(field, value, callback) {
        let oneContactGroups = `SELECT * FROM groups_contacts
                         WHERE ${field} = ${value}`
        db.get(oneContactGroups, function(err, rows) {
            if(err) {
                callback(err, null)
            } else {
                if(rows === undefined) {
                    callback(null)
                } else {
                    let newData = new ContactGroups(rows.groupsId, rows.contactsId)
                    callback(null, newData)
                }
            }
        })
    }

    static findAll(callback) {
        let selectAll = `SELECT * FROM groups_contacts`
        db.all(selectAll, function(err, arr) {
            if(err) {
                callback(err)
            } else {
                let result = [];
                for(let i = 0; i < arr.length; i++) {
                    let newData = new ContactGroups(arr[i].groupsId, arr[i].contactsId);
                    result.push(newData);
                }
                callback(null, result);
            }
        })
    }

    create(callback) {
        let addNew = `INSERT INTO Contacts(groupsId, contactsId)
                      VALUES(${this.groupsId}, ${this.contactsId});`
        db.run(addNew, function(err) {
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

    update(column, value, id, callback) {
        let query = `UPDATE groups_contacts
                     SET ${column} = "${value}"
                     WHERE id = ${id};`
        db.run(query, function(err) {
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

    static delete(id, callback) {
        let deleted = `DELETE FROM groups_contacts
                          WHERE id = ${id}`
        db.run(deleted, function(err, del) {
            if(err) {
                callback(err, null)
            } else {
                callback(null, del)
            }
        })
    }
}

module.exports = ContactGroups