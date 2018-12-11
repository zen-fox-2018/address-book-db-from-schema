const db = require('../Database/Connector')

class Contactgroup {
    constructor(obj) {
        this.id = obj['id']
        this.group_id = obj['group_id']
        this.contact_id = obj['contact_id']
    }

    static findAll(callback) {
        db.all(`SELECT * FROM contactgroups`, (err, rows)=> {
            if(err) callback(err, null)
            else {
                let result = []
                for(let i = 0; i < rows.length; i++) {
                    result.push(new Contactgroup(rows[i]))
                }
                callback(null, result)
            }
        })
    }

    static insertDataContactGroup(group_id, contact_id, callback) {
        db.run(`INSERT INTO contactgroups VALUES(null , ${group_id}, ${contact_id} );`,
        (err)=> {
            if(err) callback(err)
            else callback(null)
        })
    }

    static updateDataContactGroupID(id, group_id, contact_id, callback) {
        db.run(`UPDATE contactgroups 
                    SET 
                    group_id = ${group_id}
                    contact_id = ${contact_id}
                WHERE id = ${id};`, (err)=> {
                    if(err) callback(err)
                    else callback(null)
                })
    }

    static deleteGroupID(id ,callback) {
        db.run(`DELETE FROM contactgroups WHERE id = ${id};`,
        (err)=> {
            if(err) callback(err)
            else callback(null)
        })
    }
}

module.exports = Contactgroup