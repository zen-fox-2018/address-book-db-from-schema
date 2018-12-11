
const args = process.argv.slice(2);
const command = args[0];
const Contacts = require("./Controllers/contatcs");
const Groups = require("./Controllers/group")

switch (command) {
    case "create":
        if(args[1] === "contacts") {
            Contacts.create(args[2], args[3], args[4], args[5])
        } else if (args[1] === "groups") {
            Groups.create(args[2])
        }
        break;
    case "update":
        if(args[1] === "contacts") {
            Contacts.update()
        } else if (args[1] === "groups") {
            Groups.update()
        }
        break;
    case "findAll":
        if(args[1] === "contacts") {
            Contacts.findAll()
        }
    default:
        break;
}