const Contact = require('../models/Contact')
const Group = require('../models/Group')
const Contactgroup = require('../models/Contact-group')
const View = require('../view/View')

class Controller {
    static showContact() {
        Contact.findAll((err,data)=> {
            if(err) View.showErr(err)
            else View.showData(data)
        })
    }

    static showGroup() {
        Group.findAll((err,data)=> {
            if(err) View.showErr(err)
            else View.showData(data)
        })
    }

    static addGroup(name) {
        Group.insertDataGroup(name , (err)=> {
            if(err) View.showErr(err)
            else View,showSucc
        })
    }

    static addContact(name, company, phone_number, email) {
        Contact.insertDataContact(name, company, phone_number, email, (err)=> {
            if(err) View.showErr(err)
            else View.showSucc()
        })
    }

    static updateContact(id, name, company, phone_number, email) {
        Contact.updateDataContactID(id, name, company, phone_number, email, (err) => {
            if(err) View.showErr(err)
            else View.showSucc()
        })
    }

    static updateGroup(id, name) {
        Group.updateDataGroupID(id, name, (err) => {
            if(err) View.showErr(err)
            else View.showSucc()
        })
    }

    static deleteContact(id) {
        Contact.deleteContactID(id, (err)=> {
            if(err) View.showErr(err);
            else View.showSucc
        })
    }

    static deleteGroup(id) {
        Group.deleteGroupID(id, (err)=> {
            if(err) View.showErr(err);
            else View.showSucc
        })
    }
}

module.exports = Controller