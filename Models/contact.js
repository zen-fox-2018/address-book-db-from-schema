
const db = require("../db");

class Contacts {
    constructor(id, name, company, phone_number, email) {
        this.id = id;
        this.name = name;
        this.company = company;
        this.phone_number = phone_number;
        this.email = email;
    }

    static findOne(field, value, callback) {
        let oneContacts = `SELECT * FROM Contacts
                           WHERE ${field} = ${value}`
        db.get(oneContacts, function(err, rows) {
            if(err) {
                callback(err, null)
            } else {
                if(rows === undefined) {
                    callback(null)
                } else {
                    let newData = new Contacts(rows.id, rows.name, rows.company, rows.phone_number, rows.email)
                    callback(null, newData)
                }
            }
        })
    }

    static findAll(callback) {
        let selectAll = `SELECT Contacts.id, Contacts.name, Groups.group_name AS groups 
                         FROM Contacts JOIN groups_contacts ON Contacts.id = groups_contacts.contactsId 
                         JOIN Groups on groups_contacts.groupsId = Groups.id
                         GROUP BY name
                         ORDER BY Groups.id ASC`
        db.all(selectAll, function(err, arr) {
            if(err) {
                callback(err)
            } else {
                let result = [];
                for(let i = 0; i < arr.length; i++) {
                    let newData = new Contacts(arr[i].id, arr[i].name, arr[i].company, arr[i].phone_number, arr[i].email);
                    result.push(newData);
                }
                callback(null, result);
            }
        })
    }

    create(callback) {
        let addNewPerson = `INSERT INTO Contacts(name, company, phone_number, email)
                            VALUES(${this.name}, ${this.company}, ${this.phone_number}, ${this.email});`
        db.run(addNewPerson, function(err) {
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

    update(column, value, id, callback) {
        let query = `UPDATE Contacts
                     SET ${column} = "${value}"
                     WHERE id = ${id};`
        db.run(query, function(err) {
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

    static delete(id, callback) {
        let deleteUser = `DELETE FROM Employees
                          WHERE id = ${id}`
        db.run(deleteUser, function(err, deleted) {
            if(err) {
                callback(err, null)
            } else {
                callback(null, deleted)
            }
        })
    }

}

module.exports = Contacts