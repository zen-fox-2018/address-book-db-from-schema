const ContactController = require('./ContactController.js')
const GroupController = require('./GroupController.js')
const ContactGroupController = require('./ContactGroupController.js')

const argv = process.argv.slice(2)

let command = argv[0]
let section = argv[1]
let options = argv.slice(2)

if (command === "assign") {
  options = argv.slice(1)
}

switch (command) {
  case "create":
    if (section === "contact") {
      ContactController.create(options)
    }
    else if (section === "group") {
      GroupController.create(options)
    }
    break;

  case "update":
    if (section === "contact") {
      ContactController.update(options)
    }
    else if (section === "group") {
      GroupController.update(options)
    }
    break;

  case "delete":
    if (section === "contact") {
      ContactController.delete(options)
    }
    else if (section === "group") {
      GroupController.delete(options)
    }
    break;

  case "show":
    if (section === "contact") {
      ContactController.show(options)
    }
    else if (section === "group") {
      GroupController.show(options)
    }
    break;

  case "assign":
    ContactGroupController.create(options)
    break;

  case "showContacts":
    ContactController.showContacts()
    break;

  case "showGroups":
    GroupController.showGroups()
    break;

  default: console.log(`Silahkan baca panduan untuk menggunakan sistem ini`);

}
