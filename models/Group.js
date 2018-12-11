const db = require('../db')

class Group {

    static findOne(obj, cb) {
        let field = Object.keys(obj)
        let input = Object.values(obj)
        let query = `
        SELECT *
        FROM Groups
        WHERE ${field[0]} = ?`
        db.get(query, input, (err, data) => {
            err? cb({msg: 'err findOne group', err: err}): cb(null, data)
        })
    }

    static create(obj, cb) {
        let input = Object.values(obj)
        let query = `
        INSERT INTO Groups
        VALUES (null, ?)`
        db.run(query, input, (err) => {
            err? cb({msg: 'err insert group', err: err}): cb(null)
        })
    }

}

module.exports = Group