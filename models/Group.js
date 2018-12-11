const db = require('../db')

class Group {
    constructor(id, group_name) {
        this.id = id
        this.name = group_name
    }

    static findOne(input, cb) {
        let query = `SELECT * FROM Groups WHERE id = ${input.id}`

        db.get(query, function(err, row) {
            if(err) {
                cb('Error findOne Group => ', err, null)
            } else {
                let group = new Group(row.id, row.group_name)
                cb(null, group)
            }
        })
    }

    static findAll(cb) {
        let query = `SELECT * FROM Groups`

        db.all(query, function(err, data) {
            if(err) {
                cb('Error findAll Group => ', err, null)
            } else {
                let dataAll = []
                for(let i = 0; i < data.length; i++) {
                    let group = new Group(data[i].id, data[i].group_name)
                    dataAll.push(group)
                }
                cb(null, dataAll)
            }
        })
    }

    create(cb) {
        let query = 
        `INSERT INTO Groups (group_name)
        VALUES ("${this.name}")`

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
        `UPDATE Groups SET ${input.field} = "${input.value}" WHERE id = ${input.id}`
        
        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    delete(input, cb) {
        let query = `DELETE FROM Groups WHERE id = ${input.id}`

        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }
}

module.exports = Group
