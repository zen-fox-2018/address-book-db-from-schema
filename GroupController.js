const Group = require('./Group.js')
const ContactGroup = require('./ContactGroup.js')
const View = require('./View.js')

class GroupController {

  static create(options) {
    let objCheck = {
      field: "name",
      value: `"${options[0]}"`
    }
    Group.findOne(objCheck, function(err, dataGroup) {
      if (err) {
        View.error(err)
      }
      else {
        if (Object.keys(dataGroup).length !== 0) {
          View.message(`Group already exist`)
        }
        else {
          let obj = {
            name: options[0],
          }
          let newGroup = new Group(obj)
          newGroup.save(function(err, data) {
            if (err) {
              View.error(err)
            }
            else {
              if (data.changes === 1) {
                View.message(`Group created`)
              }
              else {
                View.message(`There was a problem while creating group`)
              }
            }
          })
        }
      }
    })
  }

  static update(options) {
    let obj = {
      field: "name",
      value: `"${options[0]}"`
    }
    Group.findOne(obj, function(err, dataGroup) {
      if (err) {
        View.error(err)
      }
      else {
        if (Object.keys(dataGroup).length === 0) {
          View.message(`Can't find group or group already deleted`)
        }
        else {
          let group = dataGroup
          let objUpdate = {
            field: "name",
            value: `"${options[1]}"`
          }
          group.update(objUpdate, function(err, data) {
            if (err) {
              View.error(err)
            }
            else {
              if (data.changes === 1) {
                View.message(`Group ${options[0]} changed to ${options[1]}`)
              }
              else {
                View.message(`There was a problem while updating group`)
              }
            }
          })
        }
      }
    })
  }

  static delete(options) {
    let obj = {
      field: "name",
      value: `"${options[0]}"`
    }
    Group.findOne(obj, function(err, dataGroup) {
      if (err) {
        View.error(err)
      }
      else {
        if (Object.keys(dataGroup).length === 0) {
          View.message(`Can't find group or group already deleted`)
        }
        else {
          let group = dataGroup
          let objContactGroup = {
            field: "groupId",
            value: group.id
          }
          ContactGroup.findAll(objContactGroup, function(err, dataContactGroups) {
            if (err) {
              View.error(err)
            }
            else {
              let contactGroups = dataContactGroups
              console.log(contactGroups);
              for (let i = 0; i < contactGroups.length; i++) {
                contactGroups[i].delete(function(err, data) {
                  if (err) {
                    View.error(err)
                  }
                })
              }
            }
          })
          group.delete(function(err, data) {
            if (err) {
              View.error(err)
            }
            else {
              if (data.changes === 1) {
                View.message(`Group deleted`)
              }
              else {
                View.message(`There was a problem while deleting group`)
              }
            }
          })
        }
      }
    })
  }
}

module.exports = GroupController