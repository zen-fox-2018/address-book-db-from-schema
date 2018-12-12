const db = require('../database/connection.js')
const fs = require('fs')

class Contact {
    constructor(name, company, number, email) {
        this.name = name,
            this.company = company,
            this.number = number,
            this.email = email
    }

    static getAll(cb) {
        let query =
            `SELECT * FROM Contacts`

        db.all(query, function (err, data) {
            if (err) {
                cb(err)
            } else {
                cb(data)
            }
        })
    }

    static insert(newContact, cb) {
        let query =
            `INSERT INTO Contacts (name, company, number, email)
        VALUES ('${newContact.name}','${newContact.company}', '${newContact.number}', '${newContact.email}')`

        db.run(query, function (err) {
            if (err) {
                cb(err)
            }
        })
    }

    static update(column, id, value, cb) {
        let query =
            `UPDATE Contacts
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
            `DELETE FROM Contacts
    WHERE id IS NOT NULL`

        db.run(query, function (err) {
            if (err) {
                cb(err)
            }
        })
    }

    static showContact(name, cb) {
        let query =
            `SELECT name, company, phone, email, Groups.name
       FROM Contacts
       INNER JOIN Contacts_Groups ON Contacts_Groups.Contacts_Id = Contacts.id
       INNER JOIN Groups ON Contacts_Groups.Groups_Id  = Groups.id 
       WHERE name = ${name}`

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
     `SELECT *'
      FROM Contacts
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

module.exports = Contact