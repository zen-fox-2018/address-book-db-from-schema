const ContactController = require('./Controllers/ContactController')

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
            break;
        } else if (todo === "update") {
            ContactController.update(input)
            break;
        }
        break;

    default:
        break;
}
