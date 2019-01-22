const db = require('../db')

class Contact {
    constructor(object) {
        this._id = object.id;
        this._name = object.name;
        this._company = object.company;
        this._phone = object.phone;
        this._email = object.email;
        this._group = object.groups_name
    }
    get name() {
        return this._name
    }

    get id() {
        return this._id
    }

    get company() {
        return this._company
    }

    get phone() {
        return this._phone
    }

    get email() {
        return this._email
    }

    set name(input) {
        this._name = input
    }

    set company(input) {
        this._company = input
    }

    static execute(query,input, callback) {
        db.run(query, input, function (err) {
            if (err) {
                callback(err)
            } else {
                callback(null, this)
            }
        })
    }

    static findOne (object, callback) {
        let query = `SELECT * FROM (SELECT Contacts.id, name, company, phone, email, group_concat(Groups.group_name)AS groups_name 
        FROM Contacts 
        lEFT JOIN ContactGroups 
            ON Contacts.id = ContactGroups.contactId
        LEFT JOIN Groups 
            On Groups.id = ContactGroups.groupId
        GROUP BY Contacts.name)
        WHERE ${object.field} = ?`
        let input = [object.value]
        db.get(query, input, function(err, row) {
            if (err) {
                callback(err)
            } else {
                if (row) {
                    let obj = {
                        id: row.id,
                        name: row.name,
                        company:row.company,
                        phone: row.phone,
                        email:row.email,
                        groups_name: row.groups_name
                    }
                    let kontak = new Contact(obj)
                    callback(null,kontak)
                } else {
                    callback(null,{})
                }
            }
        })
    }

    static findAll(callback) {
        let query = `
        SELECT Contacts.id, name, company, phone, email, group_concat(Groups.group_name)AS groups_name 
        FROM Contacts 
        LEFT JOIN ContactGroups 
            ON Contacts.id = ContactGroups.contactId
        LEFT JOIN Groups 
            On Groups.id = ContactGroups.groupId
        GROUP BY Contacts.name `
        db.all(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                let result = []
                rows.forEach(person => {
                    let newcontact = new Contact (person)
                    result.push(newcontact)
                })
                callback(null,result)
            }
        })
    }
    
    create(callback) {
        let query = `
        INSERT INTO Contacts (name, company, phone, email)
        VALUES (?, ?, ?, ?)
        `
        let input = Object.values(this).filter(element => element !== undefined)
        Contact.execute(query, input, function (err,data) {
            if (err) {
                callback(err)
            } else {
                callback(null,data)
            }
        })
    }

    static countContact(callback) {
        let query = `SELECT COUNT(*) AS total FROM Contacts`
        db.all(query,function(err, rows) {
            if (err) {
                callback(err)
            } else {
                callback(null,rows[0].total)
            }
        })
    }

    delete( field ,callback) {
        let query = `DELETE FROM Contacts WHERE ${field} = ?`
        let input = [this[field]]
        Contact.execute(query,input, function (err, data){
            if (err) {
                callback(err)
            } else {
                callback(data)
            }
        })
    }

    update(field, callback) {
        let query = `UPDATE Contacts SET ${field} = ?
        WHERE email = ?`
        let input = [this.field, this.email]
        Contact.execute(query,input, function(err, data) {
            if (err) {
                callback(err)
            } else {
                callback(null,data)
            }
        })
    }
    


}

module.exports = Contact