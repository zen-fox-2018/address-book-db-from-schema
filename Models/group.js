
const db = require("../db");

class Groups {
    constructor(id, group_name) {
        this.id = id;
        this.group_name = group_name;
    }

    static finOne(field, value, callback) {
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

                    callback(null, result);
                }
            }
        })
    }

    create() {
        
    }
}

module.exports = Groups