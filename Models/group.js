
const db = require("../db");

class Groups {
    constructor(id, group_name) {
        this.id = id;
        this.group_name = group_name;
    }

    static findOne(field, value, callback) {
        let oneGroups = `SELECT * FROM Groups
                         WHERE ${field} = ${value}`
        db.get(oneGroups, function(err, rows) {
            if(err) {
                callback(err, null)
            } else {
                if(rows === undefined) {
                    callback(null)
                } else {
                    let newData = new Groups(rows.id, rows.group_name)
                    callback(null, newData)
                }
            }
        })
    }

    static findAll(callback) {
        let selectAll = `SELECT * FROM GROUPS`
        db.all(selectAll, function(err, arr) {
            if(err) {
                callback(err)
            } else {
                let result = [];
                for(let i = 0; i < arr.length; i++) {
                    let newData = new Groups(arr[i].id, arr[i].group_name);
                    result.push(newData);
                }
                callback(null, result);
            }
        })
    }

    create(callback) {
        let addNewPerson = `INSERT INTO Groups(group_name)
                            VALUES("${this.group_name}");`
        db.run(addNewPerson, function(err) {
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

    static deleted(id, callback) {
        let deleteUser = `DELETE FROM Groups
                          WHERE id = ${id}`
        db.run(deleteUser, function(err) {
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }


    update(column, value, id, callback) {
        let query = `UPDATE Groups
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
}

module.exports = Groups