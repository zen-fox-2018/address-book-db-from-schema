const View = require('../Views/view')
const Group = require('../Models/group')
const Contact = require('../Models/contact')
const ContactGroup = require('../Models/contact-group')

class GroupController {
    static showall() {
        Group.findAll(function (err, data) {
            if (err) {
                View.displayErr(err)
            } else {
                View.displaySuccess(data)
            }
        })
    }

    static findById(input) {
        let search = {field:"id", value: Number(input[0])}
        Group.findOne(search, function (err, row) {
            if (err) {
                View.displayErr(err)
            } else {
                console.log(row.id)
                if(row.id === undefined) {
                    View.displayErr(`data dengan id : ${input[0]} tidak ditemukan`)
                } else {
                    View.displaySuccess(row)
                }
            }
        })
    }

    static createGroup(input) {
        // console.log(input)
        let group = {
            groupname:input[0],
        }
        let newgroup= new Group(group)
        // console.log(newcontact)
        newgroup.create(function (err) {
            if (err) {
                View.displayErr(err)
                // console.log("masuk")
                console.log(newgroup)
            } else {
                let obj = {field:"group_name",value: newgroup.groupname}
                // console.log(obj)
                Group.findOne(obj, function(err, row) {
                    if (err) {
                        View.displayErr(err)
                    } else {
                        console.log(row)
                        Group.countGroup( function(err, length){
                            if (err) {
                                View.displayErr(err)
                            } else {
                                View.displaySuccess(`berhasil add Group ${JSON.stringify(row)}, total group : ${length}`)
                            }
                        })
                    }
                })
            }
        })
    }

    static Update(field, callback) {

    }

    static addContact(input) {
        let caricontact = {
            field: "email",
            value: input[0]
        }
        Contact.findOne(caricontact,function(err,dataContact) {
            if (err) {
                View.displayErr(err)
                
            } else {
            if (dataContact.id === undefined) {
                View.displayErr('email belum terdaftar')
            } else {
                let carigroup = {
                    field: "group_name",
                    value: input[1]
                }
                Group.findOne(carigroup, function (err, datagroup) {
                    if (err) {
                        View.displayErr(err)
                    } else {
                        if (datagroup.id === undefined) {
                            View.displayErr("nama group tidak ada")
                        } else {
                            let contact = dataContact
                            let group = datagroup
                            let contactgroup = {
                                contactId: contact.id,
                                groupId: group.id
                            }
                            let konjungsi = new ContactGroup(contactgroup)
                            konjungsi.create(function(err, data) {
                                if (err) {
                                    View.displayErr(err)
                                } else {
                                    View.displaySuccess(`berhasil menambahkan ke contact group dengan id ${data.lastId}`)
                                }
                            })
                        }
                    }
                })
            }
        }
     })
    }
}

module.exports = GroupController