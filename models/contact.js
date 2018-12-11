const fs = require('fs');
const db = require('../dbConnect.js');

class Contact {
    constructor(name, company, phone, email) {
        this.name = name;
        this.company = company;
        this.phone = phone;
        this.email = email;
    }

    static findAll(callback) {
        let qSearch =
        `
        SELECT
         *
        FROM
         Contacts
        ;`;

        db.all(qSearch, (err, search) => {
            if (err) {
                callback(err, null);
            } else {

                let data = [];

                for (let i = 0; i < search.length; i++) {
                    data.push(new Contact(search[i].name, search[i].company, search[i].phone, search[i].email));
                }
                callback(null, data);
            }
        });
    }
}

module.exports = Contact;