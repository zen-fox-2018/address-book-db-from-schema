const ContactGroup = require('./ContactGroup.js')
const Contact = require('./Contact.js')
const Group = require('./Group.js')
const View = require('./View.js')

class ContactGroupController {
  static create(options) {
    let contactId = 0
    let groupId = 0
    let objContact = {
      field: "email",
      value: `"${options[0]}"`
    }
    Contact.findOne(objContact, function(err, dataContact) {
      if (err) {
        View.error(err)
      }
      else {
        if (Object.keys(dataContact).length === 0) {
          View.message(`Can't find contact`)
        }
        else {
          contactId = dataContact.id
          let objGroup = {
            field: "name",
            value: `"${options[1]}"`
          }
          Group.findOne(objGroup, function(err, dataGroup) {
            if (err) {
              View.error(err)
            }
            else {
              if (Object.keys(dataGroup).length === 0) {
                View.message(`Can't find contact`)
              }
              else {
                groupId = dataGroup.id
                let objContactGroup = {
                  contactId: contactId,
                  groupId: groupId
                }
                let newContactGroup = new ContactGroup(objContactGroup)
                newContactGroup.save(function(err, data) {
                  if (err) {
                    View.error(err)
                  }
                  else {
                    if (data.changes === 1) {
                      View.message(`${options[0]} assigned to ${options[1]}`)
                    }
                    else {
                      View.message(`cannot ${options[0]} assign to ${options[1]}`)
                    }
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

module.exports = ContactGroupController