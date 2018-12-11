const command = process.argv.slice(2)
const contacts = require('./contact.js')

switch (command[0]) {
    case "showAll":
        contacts.showAll(command[1])
        break;

    default:
        break;
}