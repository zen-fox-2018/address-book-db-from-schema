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

    static update(name, obj, cb) {
        let field = Object.keys(obj).map(e => e += ' = ?').join(', ')
        let input = Object.values(obj)
        let query = `
        UPDATE Groups
        SET ${field}
        WHERE name = "${name}"`
        db.run(query, input, function(err) {
            if (err) {
                cb({msg: 'err update group', err: err})
            } else {
                cb(null, this)
            }
        })
    }

    static delete(obj, cb) {
        let field = Object.keys(obj)
        let input = Object.values(obj)
        let query = `
        DELETE FROM Groups
        WHERE ${field} = ?`
        db.run(query, input, (err) => {
            err? cb({msg: 'err delete Groups', err: err}): cb(null)
        })
    }

    static show(obj, cb) {
        let field = Object.keys(obj)
        let input = Object.values(obj)
        let query = `
        SELECT Contacts.name AS "contact", Groups.*
        FROM Contacts_Groups
        JOIN Contacts ON Contacts_Groups.ContactId = Contacts.id
        JOIN Groups ON Contacts_Groups.GroupId = Groups.id
        WHERE Groups.${field} = ?`
        db.all(query, input, (err, data) => {
            err? cb({msg: 'err showGroup', err: err}): cb(null, data)
        })
    }
}

module.exports = Group