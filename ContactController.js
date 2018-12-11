const Contact = require('./Contact.js')
const ContactGroup = require('./ContactGroup.js')
const View = require('./View.js')

class ContactController {
  static create(options) {
    let obj = {
      name: options[0],
      company: options[1],
      phone_number: options[2],
      email: options[3]
    }
    if (obj.phone_number.length >= 17) {
      View.message(`Invalid phone number`)
    }
    else if (obj.email.indexOf("@") === -1) {
      View.message(`Invalid email address`)
    }
    else {
      let objCheckPhone = {
        field: "phone_number",
        value: `"${options[2]}"`
      }
      Contact.findOne(objCheckPhone, function(err, phoneCheck) {
        if (err) {
          View.error(err)
        }
        else {
          if (Object.keys(phoneCheck).length !== 0) {
            View.message(`Phone number already used`)
          }
          else {
            let objCheckEmail = {
              field: "email",
              value: `"${options[3]}"`
            }
            Contact.findOne(objCheckEmail, function(err, emailCheck) {
              if (err) {
                View.error(err)
              }
              else {
                if (Object.keys(emailCheck).length !== 0) {
                  View.message(`Email address already used`)
                }
                else {
                  let newContact = new Contact(obj)
                  newContact.save(function(err, data) {
                    if (err) {
                      View.error(err)
                    }
                    else {
                      if (data.changes === 1) {
                        View.message(`Contact added sucessfully`)
                      }
                      else {
                        View.message(`There was a problem during process while saving you contact`)
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

  static update(options) {
    if (options[1] === "email" || options[1] === "phone_number") {
      View.message(`Email or phone number cannot be changed`)
    }
    else {
      let obj = {
        field: "email",
        value: `"${options[0]}"`
      }
      Contact.findOne(obj, function(err, dataContact) {
        if (err) {
          View.error(err)
        }
        else {
          let objUpdate = {
            field: options[1],
            value: `"${options[2]}"`
          }
          let contact = dataContact
          contact.update(objUpdate, function(err, data) {
            if (err) {
              View.error(err)
            }
            else {
              if (data.changes === 1) {
                View.message(`Contact updated successfully`)
              }
              else {
                View.message(`There was a problem during process while updating your contact`)
              }
            }
          })
        }
      })
    }
  }

  static delete(options) {
    let obj = {
      field: "email",
      value: `"${options[0]}"`
    }
    Contact.findOne(obj, function(err, dataContact) {
      if (err) {
        View.error(err)
      }
      else {
        if (Object.keys(dataContact).length === 0) {
          View.message(`Can't find contact or group already deleted`)
        }
        else {
          let contact = dataContact
          let objContactGroup = {
            field: "contactId",
            value: contact.id
          }
          ContactGroup.findAll(objContactGroup, function(err, dataContactGroups) {
            if (err) {
              View.error(err)
            }
            else {
              let contactGroups = dataContactGroups
              for (let i = 0; i < contactGroups.length; i++) {
                contactGroups[i].delete(function(err, data) {
                  if (err) {
                    View.error(err)
                  }
                })
              }
            }
          })
          contact.delete(function(err, data) {
            if (err) {
              View.error(err)
            }
            else {
              if (data.changes === 1) {
                View.message(`Contact deleted`)
              }
              else {
                View.message(`There was a problem deteling your contact, try again later`)
              }
            }
          })
        }
      }
    })
  }
}

module.exports = ContactController