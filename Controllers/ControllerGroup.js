const Group = require(`../Models/Group`)
const View = require(`../Views/View`)

class ControllerGroup {
    static create(name) {
        Group.findOne(`name`, name, function (err, data) {
            err ?
                View.errorCreateGroup(err) :
                data.name == name ?
                    View.errorCreateGroup(`cant create, group name exists`) :
                    data.create(name, function(err, data) {
                        err ?
                            View.errorCreateGroup(`something went wrong, err: ${err}`) :
                            View.successCreateGroup(`success create group with id: ${data.lastID}`)
                    })
        })
    }

    static delete(name) {
        Group.findOne(`name`, name, function (err, data) {
            err ?
                View.errorDeleteContact(`something went wrong, err ${err}`) :
                data.name == name ?
                    data.delete(`name`, name, function (err, data) {
                        err ?
                            View.errorDeleteGroup(`something went wrong, err: ${err}`) :
                            View.successDeleteGroup(`success delete group ${name}`)
                    }) :
                    View.errorDeleteGroup(`cant delete group, group ${name} not exist`)
                
        })
    }

    static update(groupName, whereCase, newStatus) {
        Group.findOne(`name`, groupName, function (err, data) {
            err ?
                View.errorUpdateGroup(`something went wrong, err: ${err}`) :
                data.name == null ?
                    View.errorUpdateGroup(`group name not found!`) :
                    data.update(groupName, whereCase, newStatus, function(err, data) {
                        err ?
                            View.errorUpdateGroup(`error update group, err: ${err}`) :
                            View.successUpdateGroup(`success update ${groupName} ${whereCase} to ${newStatus}`)
                    })
                
        })
    }
}

module.exports = ControllerGroup