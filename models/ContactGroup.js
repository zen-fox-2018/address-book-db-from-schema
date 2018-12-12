const db = require('../db')

class ContactGroup {
    
    static findWhere(obj, cb) {
        let field = Object.keys(obj)
        let input = Object.values(obj)
        let query = `
        SELECT *
        FROM Contacts_Groups
        WHERE ${field[0]} = ?`
        db.all(query, input, (err, data) => {
            err? cb({msg: 'err findWhere ContactGroup', err: err}): cb(null, data)
        })
    }

    static create(obj, cb) {
        let input = Object.values(obj)
        let query = `
        INSERT INTO Contacts_Groups
        VALUES (null, ?, ?)`
        db.run(query, input, (err) => {
            err? cb({msg: 'err insert contactGroup', err: err}): cb(null)
        })
    }

    static delete(obj, cb) {
        let field = Object.keys(obj)
        let input = Object.values(obj)
        let query = `
        DELETE FROM Contacts_groups
        WHERE ${field} = ?`
        db.serialize(() => {
            db.run('PRAGMA foreign_keys = ON', (err) => {
                if (err) {
                    cb({msg: 'err pragma ContactGroup', err: err})
                } else {
                    db.run(query, input, (err) => {
                        err? cb({msg: 'err delete ContactGroup', err: err}): cb(null)
                    })
                }
            })
        })
    }

}

module.exports = ContactGroup