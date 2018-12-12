const ContactController = require('./Controllers/ContactController')
const GroupController = require('./Controllers/GroupController')
const HelpController = require('./Controllers/HelpController')
const argv = process.argv.slice(2)
let command = argv[0]
let todo = argv[1]
let input = argv.slice(2)


switch (command) {
    case "contact":
        if (todo === "showall") {
            ContactController.showall()
        } else if (todo === "findById") {
            ContactController.findById(input)
        } else if (todo === "create") {
            ContactController.addContact(input)
        } else if (todo === "delete") {
            ContactController.delete(input)
        } else if (todo === "update") {
            ContactController.update(input)
        }
        break;
    case "group":
        if (todo === "showall") {
            GroupController.showall()
        } else if (todo === "findById") {
            GroupController.findById(input)
        } else if (todo === "create") {
            GroupController.createGroup(input)
        } else if (todo === "delete") {
            GroupController.delete(input)
        } else if (todo === "update") {
            GroupController.update(input)
        } else if (todo === "addcontact") {
            GroupController.addContact(input)
        }
    // default: HelpController.help()
        break;
}
