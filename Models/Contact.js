const db = require(`../db`)
class Contact {
    constructor(input) {
        this.id = input ? input.id : null
        this.name = input ? input.name : null
        this.company_name = input ? input.company_name : null
        this.telephone_number = input ? input.telephone_number : null
        this.email = input ? input.email : null
    }

    static findAll() {

    }

    static findOne(whereCase, whereStatus, cb) {
        let qFindOne = `SELECT * FROM Contacts WHERE ${whereCase} = "${whereStatus}"`
        db.get(qFindOne, function (err, row) {
            let self;
            row ?
                self = new Contact({
                    name: row.name,
                    company_name: row.company_name,
                    telephone_number: row.telephone_number,
                    email: row.telephone_number
                }) :
                self = new Contact()
            err ?
                cb(err, null) :
                cb(null, self)
        })
    }

    create(name, company_name, telephone_number, email, cb) {
        let qCreate = `INSERT INTO Contacts (
            name, company_name, telephone_number, email
        ) VALUES (
            "${name}", "${company_name}", ${telephone_number}, "${email}"
        )`

        db.run(qCreate, function (err) {
            err ?
                cb(err, null) :
                cb(null, this)
        })

    }

    save() {

    }

    delete(whereCase, whereStatus, cb) {
        let qDelete = `DELETE FROM Contacts WHERE ${whereCase} = "${whereStatus}"`
        db.run(qDelete, function (err, data) {
            err ?
                cb(err, null) :
                cb(null, data)
        })
    }

    update(telephone_number, whereCase, newStatus, cb) {
        let qUpdate = `UPDATE Contacts SET ${whereCase} = ${newStatus} WHERE telephone_number = ${telephone_number}`
        db.run(qUpdate, function (err) {
            err ?
                cb(err, null) :
                cb(null, this)
        })
    }

}

module.exports = Contact