const db = require(`../db`)
class Contact {
    constructor(input) {
        this.id = input ? input.id : null
        this.name = input ? input.name : null
        this.company_name = input ? input.company_name : null
        this.telephone_number = input ? input.telephone_number : null
        this.email = input ? input.email : null
        this.grup = input ?
            input.grup != undefined ?
                input.grup.split(`,`) : null : null
    }

    static findAll(cb) {
        let qFindAll = `SELECT C.name AS name,C.company_name AS companyName, C.telephone_number AS phoneNum, C.email as email, group_concat(G.name) AS Grup FROM Contacts C 
        LEFT JOIN ContactGroups CG ON C.id = CG.contact_id
        LEFT JOIN Groups G ON CG.group_id = G.id GROUP BY C.name`
        db.all(qFindAll, function (err, data) {
            for (let i = 0; i < data.length; i++) {
                data[i] = new Contact({
                    id: data[i].id,
                    name: data[i].name,
                    company_name: data[i].companyName,
                    telephone_number: data[i].phoneNum,
                    email: data[i].email,
                    grup: data[i].Grup
                })

            }
            err ?
                cb(err, null) :
                cb(null, data)
        })
    }

    static findOne(whereCase, whereStatus, cb) {
        let qFindOne = `SELECT * FROM Contacts WHERE ${whereCase} = "${whereStatus}"`
        db.get(qFindOne, function (err, row) {
            let self;
            row ?
                self = new Contact({
                    id: row.id,
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