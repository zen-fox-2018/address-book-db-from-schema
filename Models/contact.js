
const db = require("../db");

class Contacts {
    constructor(id, name, company, phone_number, email) {
        this.id = id;
        this.name = name;
        this.company = company;
        this.phone_number = phone_number;
        this.email = email;
    }

    static finOne(field, value, callback) {
        // console.log(field, "===========", value)
        let oneContacts = `SELECT * FROM Contacts
                         WHERE ${field} = "${value}"`
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
        let selectAll = `SELECT * FROM Contacts`
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

    static create(input, callback) {
        let addNewPerson = `INSERT INTO Contacts(name, company, phone_number, email)
                            VALUES(${input.name}, ${input.company}, ${input.phone_number}, ${input.email});`
        db.run(addNewPerson, function(err) {
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

    static update(column, value, id, callback) {
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

    static delete() {

    }

}

module.exports = Contacts