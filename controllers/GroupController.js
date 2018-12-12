const Contact = require('../models/Contact')
const Group = require('../models/Group')
const ContactGroup = require('../models/ContactGroup')
const View = require('../views/View')

class GroupController {

    static create(obj) {
        let find = {
            name: obj.name
        }
        Group.findOne(find, (err, data) => {
            if (err) {
                View.disErr(err)
            } else {
                if (data) {
                    View.disErr({msg: 'nama group sudah terdaftar'})
                } else {
                    Group.create(obj, (err) => {
                        err? View.disErr(err): View.disCreate('Group')
                    })
                }
            }
        })
    }

    static update(arr) {
        let name = arr[0]
        arr = arr.slice(1)
        let obj = {}
        for (let i = 0; i < arr.length; i+=2) {
            obj[arr[i]] = arr[i+1]
        }
        Group.update(name, obj, (err, data) => {
            if (err) {
                View.disErr(err)
            } else {
                data.changes === 0? View.disErr({msg: 'wrong group name'}): View.disUpdate()
            }
        })
    }
    
    static delete(name) {
        let find = {
            name: name.join(' ')
        }
        Group.findOne(find, (err, group) => {
            if (err) {
                View.disErr(err)
            } else {
                if (!group) {
                    View.disErr({msg: 'wrong group name'})
                } else {
                    let obj = {
                        GroupId: group.id
                    }
                    ContactGroup.delete(obj, (err) => {
                        if (err) {
                            View.disErr(err)
                        } else {
                            obj = {
                                id: group.id
                            }
                            Group.delete(obj, (err) => {
                                err? View.disErr(err): View.disDelete('group')
                            })
                        }
                    })
                }
            }
        })
    }

    static show(name) {
        let find = {
            name: name
        }
        Group.show(find, (err, data) => {
            if (err) {
                View.disErr(err)
            } else {
                let obj = {
                    name: data[0].name,
                    contacts: []
                }
                data.forEach(e => {
                    obj.contacts.push(e.contact)
                });
                View.showContact(obj)
            }
        })
    }
}

module.exports = GroupController