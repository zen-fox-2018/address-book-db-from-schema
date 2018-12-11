
const Contacts = require("../Models/contact");
const Views = require("../Views/view")

class ContactsController {

    static create(name, company, phone_number, email) {
        Contacts.findOne("email", email, function(err, data) {
            if(err) {
                Views.showError(err)
            } else {
                if(data) {
                    Views.showError("Sorry this email has been taken!")
                } else {
                    let newContact = new Contacts(name, company, phone_number, email)
                    newContact.create(newContact, function(err) {
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
        Contacts.findOne("id", id, function(err, updatedData) {
            if(err) {
                Views.showError(err)
            } else {
                updatedData.update(column, value, id, function(err) {
                    if(err) {
                        Views.showError(err)
                    } else {
                        Views.showUpdated("you have successfully updated this person!")
                    }
                })
            }
        })

    }

    static delete(id) {
        Contacts.delete(id, function(err, deletedData) {
            if(err) {
                Views.showError(err)
            } else {
                Views.showDeleted(deletedData)
            }
        })
    }
}

module.exports = ContactsController