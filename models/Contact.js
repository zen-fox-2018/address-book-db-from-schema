const db = require('../db')

class Contact {

    static findOne(obj, cb) {
        let field = Object.keys(obj)
        let input = Object.values(obj)
        let query = `
        SELECT *
        FROM Contacts
        WHERE ${field[0]} = ?`
        db.get(query, input, (err, data) => {
            err? cb({msg: 'err findOne', err: err}): cb(null, data)
        })
    }

    static create(obj, cb) {
        let input = Object.values(obj)
        let query = `
        INSERT INTO Contacts
        VALUES (null, ?, ?, ?, ?)`
        db.run(query, input, (err) => {
            err? cb({msg: 'err insert contact', err: err}): cb(null)
        })
    }

    static update(email, obj, cb) {
        let field = Object.keys(obj).map(e => e += ' = ?').join(', ')
        let input = Object.values(obj)
        let query = `
        UPDATE Contacts
        SET ${field}
        WHERE email = "${email}"`
        db.run(query, input, function(err) {
            if (err) {
                cb({msg: 'err update contact', err: err})
            } else {
                cb(null, this)
            }
        })
    }

    static delete(obj, cb) {
        let field = Object.keys(obj)
        let input = Object.values(obj)
        let query = `
        DELETE FROM Contacts
        WHERE ${field} = ?`
        db.serialize(() => {
            db.run('PRAGMA foreign_keys = ON', (err) => {
                if (err) {
                    cb({msg: 'err pragma contact', err: err})
                } else {
                    db.run(query, input, (err) => {
                        err? cb({msg: 'err delete Contacts', err: err}): cb(null)
                    })
                }
            })
        })
    }

    static show(obj, cb) {
        let field = Object.keys(obj)
        let input = Object.values(obj)
        let query = `
        SELECT Groups.name AS "group", Contacts.*
        FROM Contacts_Groups
        JOIN Groups ON Contacts_Groups.GroupId = Groups.id
        JOIN Contacts ON Contacts_Groups.ContactId = Contacts.id
        WHERE Contacts.${field} = ?`
        db.all(query, input, (err, data) => {
            err? cb({msg: 'err showContact', err: err}): cb(null, data)
        })
    }

}

module.exports = Contact