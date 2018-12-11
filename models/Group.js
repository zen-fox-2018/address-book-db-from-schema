const db = require('../Database/Connector')

class Group {
    constructor(obj) {
        this.id = obj['id']
        this.name = obj['name']
    }

    static findAll(callback) {
        db.all(`SELECT * FROM groups`, (err, rows)=> {
            if(err) callback(err, null)
            else {
                let result = []
                for(let i = 0; i < rows.length; i++) {
                    result.push(new Group(rows[i]))
                }
                callback(null, result)
            }
        })
    }

    static insertDataGroup(name,  callback) {
        db.run(`INSERT INTO groups VALUES(null , "${name}");`,
        (err)=> {
            if(err) callback(err)
            else callback(null)
        })
    }

    static updateDataGroupID(id, name, callback) {
        db.run(`UPDATE groups 
                    SET 
                    name = "${name}"
                WHERE id = ${id};`, (err)=> {
                    if(err) callback(err)
                    else callback(null)
                })
    }

    static deleteGroupID(id ,callback) {
        db.run(`DELETE FROM groups WHERE id = ${id};`,
        (err)=> {
            if(err) callback(err)
            else callback(null)
        })
    }
}

module.exports = Group