
const db = require("../db");

class ContactContactGroups {
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
                    let newData = new ContactGroups(rows.id, rows.group_name)
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
                    let newData = new ContactGroups(arr[i].id, arr[i].group_name);
                    result.push(newData);

                    callback(null, result);
                }
            }
        })
    }

}

module.exports = ContactContactGroups