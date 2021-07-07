const db = require('../db')

class Contact {
    constructor(id, name, company, phone, email, group) {
        this.id = id
        this.name = name
        this.company = company
        this.phone = phone
        this.email = email
        this.group = group
    }

    static findOne(field, value, cb) {
        let query = `SELECT * FROM Contacts WHERE ${field} = ?`

        db.get(query, [value], function(err, row) {
            if(err) {
                cb('Error findOne Contact => ', err, null)
            } else {
                let contact = new Contact(row.id, row.name, row.company, row.phone, row.email)
                cb(null, contact)
            }
        })
    }

    static findAll(cb) {
        let query = 
            `
            SELECT 
                Contacts.id,
                Contacts.name, 
                Contacts.company, 
                Contacts.phone, 
                Contacts.email, 
                group_concat (distinct groups.group_name) as groupList
            FROM ContactGroups
            JOIN Contacts
                ON ContactGroups.contactId = Contacts.id
            JOIN Groups
            ON ContactGroups.groupId = Groups.id
            GROUP BY name
            ORDER BY Contacts.id ASC
            `

        db.all(query, function(err, data) {
            if(err) {
                cb('Error findAll Contact => ', err, null)
            } else {
                let dataAll = []
                for(let i = 0; i < data.length; i++) {
                    let contact = new Contact(data[i].id, data[i].name, data[i].company, data[i].phone, data[i].email, data[i].groupList)
                    dataAll.push(contact)
                }
                cb(null, dataAll)
            }
        })
    }

    create(cb) {
        let query = 
        `INSERT INTO Contacts (name, company, phone, email)
        VALUES ("${this.name}", "${this.company}", "${this.phone}", "${this.email}")`

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
        `UPDATE Contacts SET ${input.field} = "${input.value}" WHERE id = ${input.id}`
        
        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    delete(input, cb) {
        let query = `DELETE FROM Contacts WHERE id = ${input}`

        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    static ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true
        }
        return false
    }
}

module.exports = Contact
