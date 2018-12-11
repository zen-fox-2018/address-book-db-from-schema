const db = require('../db')

class ContactGroup {
  constructor (input) {
    this.contactId = input.contactId
    this.groupId = input.groupId
  }
}
module.exports = ContactGroup