
const Groups = require("../Models/group");
const Views = require("../Views/view")

class GroupsController {

    static create(name) {
        let newGroup = new Groups(null, name);
        newGroup.create(function(err) {
            if(err) {
                Views.showError(err)
            } else {
                Views.showCreatedGroups("You have successfully created this group!")
            }
        })
    }

    static update(column, value, id) {
        Groups.findOne("id", id, function(err, updatedData) {
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

    static findAll() {
        Groups.findAll(function(err, group) {
            if(err) {
                Views.showError(err)
            } else {
                Views.showAll(group)
            }
        })
    }

    static deleteGroup(id) {
        Groups.deleted(id, function(err) {
            if(err) {
                Views.showError(err)
            } else {
                Views.showDeleted("you have successfully deleted this person!")
            }
        })
    }
}

module.exports = GroupsController