const db = require('../database/connection.js')


class Group {
    constructor(name) {
        this.name = name
    }

    static insert(newGroup, cb) {
        let query =
            `INSERT INTO Groups(name)
        VALUES ('${newGroup.name}')`

        db.run(query, function (err) {
            if (err) {
                cb(err)
            }
        })
    }

    static update(column, id, value, cb) {
        let query =
            `UPDATE Groups
        SET '${column}' = '${value}'
        WHERE id = ${id}`

        db.run(query, function (err) {
            if (err) {
                cb(err)
            }
        })
    }

    static delete() {
        let query =
            `DELETE FROM Groups
        WHERE id IS NOT NULL`

        db.run(query, function (err) {
            if (err) {
                cb(err)
            }
        })
    }

    static showGroup(name, cb) {
        let query =
            `SELECT name, Contacts.company, Contacts.phone, Contacts.email, Contacts.name
        FROM Groups
        INNER JOIN Contacts_Groups ON Contacts_Groups.Groups_Id = Groups.id
        INNER JOIN Contacts ON Contacts_Groups.Contacts_Id  = Contacts.id
        WHERE name = ${name} `

        db.all(query, function (err, data) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, data)
            }
        })
    }

    static findWhere(column, value, cb) {
        let query =
     `SELECT *
      FROM GRoups
      WHERE '${column}' = '${value}'`

        db.all(query, function (err, data) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, data)
            }
        })
    }
}

module.exports = Group