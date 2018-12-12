const db = require('./Connection');

class Contact {
    constructor(name, company, phone_number, email) {
        this.name = name;
        this.company = company;
        this.phone_number = phone_number;
        this.email = email
    }

    static createContactList(name, company, phone_number, email, callback) {
        Contact.insertContact(name, company, phone_number, email, function(err) {
            if (err) {
                callback(err)
            } else {
                Contact.findAllContact(function(err, contactData) {
                    if (err) {
                        callback(err, null)
                    } else {
                        let contactList =[]
                        for (let i = 0; i <= contactData.length-1; i++){
                            let dataInObjClass = new Contact(contactData[i]["Name"], contactData[i]["Company"], contactData[i]["Phone Number"], contactData[i]["Email"]);
                            contactList.push(dataInObjClass);
                        }
                        callback(null, contactList);
                    }
                })
            }
        }) 
    }

    static insertContact(name, company, phone_number, email, callback) {
        let query = `
            INSERT INTO Contact
            (Name, Company, Phone_Number, Email)
            VALUES
            ("${name}", "${company}", "${phone_number}", "${email}")`
        db.run(query, function(err) {
            if (err) {
                callback(err)
            }
        })
    }

    static findAllContact(callback) {
        let query = `SELECT * FROM Contact`;
        db.all(query, function(err, contactList) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, contactList)
            }
        })
    }

    static updateData(target, value, condition, callback) {
        let query = `
            UPDATE Contact
            SET "${target}" = "${value}"
            WHERE "${condition}"`
        db.run(query, function(err) {
            if (err) {
                callback(err)
            }
        })
    }

    static deleteData() {

    }


}

module.exports = Contact;