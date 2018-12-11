const db = require('./setup.js')

class Contact {
    constructor(nama, perusahaan, telp, email) {
        this.name = nama
        this.perusahaan = perusahaan
        this.telp = telp
        this.email = email
    }
    static create (nama, perusahaan, telp, email, callback) {
        let query = `
                    INSERT INTO Contacts (nama, perusahaan, nomorTelepon, email)
                    VALUES
                    ("${nama}", "${perusahaan}", "${telp}" ,"${email}")
        `
        db.run(query, function(err){
            if(err) {
                callback(err, null)
            }else{
                let obj = new Contact(nama, perusahaan, telp, email)
                callback (null, obj)
            }
        })
    }

    static findAll () {
        let query = `
                    SELECT *
                    FROM Contacts
        `
        db.all (query, function(err, data) {
            if(err) {
                callback(err, null)
            }else{
                let contact = []
                for(let i = 0; i < data.length; i++) {
                    let obj = new Contact(nama, perusahaan, telp, email)
                    contact.push(obj)
                }
                callback(null, contact)
            }
        })
    }

    static update (field, value, id, callback) {
        let update = `
                    UPDATE Contacts
                    SET ${field} = "${value}"
                    WHERE Contacts.id = ${Number(id)}
        `
        db.run(update, function(err) {
            if(err) {
                callback(err)
            }else {
                callback(null)
            }
        })
    }
}

module.exports = Contact;

