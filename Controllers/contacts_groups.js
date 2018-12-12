
const Contacts_Groups = require("../Models/contact-group");
const Views = require("../Views/view");

class ContactsGroups {

    static create(groupId, contactId) {
        let createNew = new Contacts_Groups(null, groupId, contactId);
        createNew.create(function(err) {
            if(err) {
                Views.showError(err)
            } else {
                Views.showCreatedContactsGroups("You have successfully added a new record!")
            }
        })
    }

    static findAll() {
        Contacts_Groups.findAll(function(err, all) {
            if(err) {
                Views.showError(err)
            } else {
                Views.showAll(all)
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
        Contacts.delete(id, function(err) {
            if(err) {
                Views.showError(err)
            } else {
                Views.showDeleted("You have successfully deleted this person from your contacts!")
            }
        })
    }
}

module.exports = ContactsGroups