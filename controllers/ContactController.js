const Contact = require('../models/Contact')
const Group = require('../models/Group')
const ContactGroup = require('../models/ContactGroup')
const View = require('../views/View')

class ContactController {

    static create(obj) {
        let find = {
            email: obj.email
        }
        Contact.findOne(find, (err, data) => {
            if (err) {
                View.disErr(err)
            } else {
                if (data) {
                    View.disErr({msg: 'email sudah terdaftar'})
                } else {
                    Contact.create(obj, (err) => {
                        err? View.disErr(err): View.disCreate('Contact')
                    })
                }
            }
        })
    }

    static update(arr) {
        let email = arr[0]
        arr = arr.slice(1)
        let obj = {}
        for (let i = 0; i < arr.length; i+=2) {
            obj[arr[i]] = arr[i+1]
        }
        Contact.update(email, obj, (err, data) => {
            if (err) {
                View.disErr(err)
            } else {
                data.changes === 0? View.disErr({msg: 'wrong email'}): View.disUpdate()
            }
        })
    }
    
    static delete(email) {
        let find = {
            email: email
        }
        Contact.findOne(find, (err, contact) => {
            if (err) {
                View.disErr(err)
            } else {
                if (!contact) {
                    View.disErr({msg: 'wrong email'})
                } else {
                    let obj = {
                        ContactId: contact.id
                    }
                    // ContactGroup.findWhere(obj, (err, contact) => {
                    //     if (err) {
                    //         View.disErr(err)
                    //     } else {
                    //         console.log(contact);
                    //     }
                    // })
                    ContactGroup.delete(obj, (err) => {
                        if (err) {
                            View.disErr(err)
                        } else {
                            obj = {
                                id: contact.id
                            }
                            Contact.delete(obj, (err) => {
                                err? View.disErr(err): View.disDelete('contact')
                            })
                        }
                    })
                }
            }
        })
    }

    static join(obj) {
        let find = {
            name: obj.name
        }
        Group.findOne(find, (err, group) => {
            if (err) {
                View.disErr(err)
            } else {
                if(!group) {
                    View.disErr({msg: 'wrong group name'})
                } else {
                    let groupId = group.id
                    find = {
                        email: obj.email
                    }
                    Contact.findOne(find, (err, contact) => {
                        if (err) {
                            View.disErr(err)
                        } else {
                            if (!contact) {
                                View.disErr({msg: 'wrong email'})
                            } else {
                                let contactId = contact.id
                                let input = {
                                    ContactId: contactId,
                                    GroupId: groupId
                                }
                                ContactGroup.create(input, (err) => {
                                    if (err) {
                                        View.disErr(err)
                                    } else {
                                        View.disJoin(obj.name)
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }
    
    static show(email) {
        let find = {
            email: email
        }
        Contact.show(find, (err, data) => {
            if (err) {
                View.disErr(err)
            } else {
                let obj = {
                    name: data[0].name,
                    company: data[0].company,
                    phone: data[0].phone,
                    groups: []
                }
                data.forEach(e => {
                    obj.groups.push(e.group)
                });
                View.showContact(obj)
            }
        })
    }
}

module.exports = ContactController