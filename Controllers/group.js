
const Groups = require("../Models/group");
const Views = require("../Views/view")

class GroupsController {

    static create(name) {
        let newGroup = new Groups(name);
        newGroup.create(name, function(err, groups) {
            if(err) {
                Views.showError(err)
            } else {
                Views.showCreatedGroups(groups)
            }
        })
    }

    static update() {

    }

    static delete(input) {
        Groups.deleted(input, function(err, deleteData) {
            if(err) {
                Views.showError(err)
            } else {
                Views.showDeleted("you have successfully deleted this person!")
            }
        })
    }
}

module.exports = GroupsController