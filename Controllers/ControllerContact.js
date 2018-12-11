const Contact = require(`../Models/Contact`)
const Group = require(`../Models/Group`)
const ContactGroups = 
const View = require(`../Views/View`)

class ControllerContact {
    static create(name, company_name, telephone_number, email) {
        Contact.findOne(`telephone_number`, telephone_number, function (err, data) {
            err ?
                View.errorCreateContact(err) :
                data.telephone_number == null ?
                    data.create(name, company_name, telephone_number, email, function (err, data) {
                        err ?
                            View.errorCreateContact(err) :
                            View.successCreateContact(`success create contact`)
                    }) :
                    View.errorCreateContact(`Cant register, phone number exists`)
        })
    }

    static delete(telephone_number) {
        Contact.findOne(`telephone_number`, telephone_number, function (err, data) {
            err ?
                View.errorDeleteContact(`something went wrong, err ${err}`) :
                data.telephone_number == telephone_number ?
                    data.delete(`telephone_number`, telephone_number, function (err, data) {
                        err ?
                            View.errorDeleteContact(`something went wrong, err: ${err}`) :
                            View.successDeleteContact(`success delete contact with telephone number: ${telephone_number}`)                                
                    }) : 
                    View.errorDeleteContact(`cant delete, contact not found!`)
                
        })
    }

    static update(telephone_number, whereCase, newStatus) {
        Contact.findOne(`telephone_number`, telephone_number, function (err, dataFind) {
            err ?
                View.errorUpdateContact(`something went wrong, err ${err}`) :
                dataFind.telephone_number == telephone_number ?
                dataFind.update(telephone_number, whereCase, newStatus, function (err, data) {
                    err ?
                        View.errorUpdateContact(`something wen wrong when update, err: ${err}`) :
                        View.successUpdateContact(`success update contact ${dataFind.name}`)
                    }) :
                    View.errorUpdateContact(`${whereCase} wrong, cant update`)
                
        })
    }

    static checkContactAndGroup(contactName, groupName) {
        Contact.findOne(`name`, contactName, function (err, data) {
            err ?
                View.errorAddContactToGroup(`something went wrong, err: ${err}`) :
                data.name != contactName ?
                    View.errorAddContactToGroup(`${contactName} tidak ada di kontak`) :
                    Group.findOne(`name`, groupName, function (err, data) {
                        err ?
                            View.errorAddContactToGroup(`something went wrong, err: ${err}`) :
                            data.name != groupName ?
                                View.errorAddContactToGroup(`grup ${groupName} tidak ada di daftar group`) :
                                assignGroup(contactName, groupName)
                    })
        })
    }

}

module.exports = ControllerContact