
const Contacts = require("../Models/contact");
const Views = require("../Views/view")

class ContactsController {

    static create(name, company, phone_number, email) {
        Contacts.finOne("email", email, function(err, data) {
            if(err) {
                Views.showError(err)
            } else {
                if(data) {
                    Views.showError("Sorry this email has been taken!")
                } else {
                    let newContact = new Contacts(name, company, phone_number, email)
                    Contacts.create(newContact, function(err) {
                        if(err) {
                            Views.showError(err)
                        } else {
                            Views.showCreateContacts("You have successfully added this person to your contacts!")
                        }
                    })
                }
            }
        })
    }

    static findAll() {
        Contacts.findAll(function(err, data) {
            if(err) {
                Views.showError(err)
            } else {
                Views.showAll(data)
            }
        })
    }

    static update(column, value, id) {
        Contacts.update(column, value, id, function(err) {
            if(err) {
                Views.showError(err)
            } else {
                Views.showUpdated("You have successfully updated this person!")
            }
        })

    }

    static delete() {
        
    }
}

module.exports = ContactsController