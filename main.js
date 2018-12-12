
const args = process.argv.slice(2);
const command = args[0];
const Contacts = require("./Controllers/contatcs");
const Groups = require("./Controllers/group");
const Contactsgroups = require("./Controllers/contacts_groups");

switch (command) {
    case "create":
        if(args[1] === "contacts") {
            Contacts.create(args[2], args[3], args[4], args[5])
        } else if (args[1] === "groups") {
            Groups.create(args[2])
        } else if (args[1] === "contacts_group") {
            Contactsgroups.create(args[2], args[3]);
        }
        break;
    case "update":
        if(args[1] === "contacts") {
            Contacts.update(args[2], args[3], args[4])
        } else if (args[1] === "groups") {
            Groups.update(args[2], args[3], args[4])
        } else if (args[1] === "contacts_group") {
            Contactsgroups.update(args[2], args[3], args[4])
        }
        break;
    case "findAll":
        if(args[1] === "contacts") {
            Contacts.findAll()
        } else if (args[1] === "groups"){
            Groups.findAll()
        } else if (args[1] === "contacts_group") {
            Contactsgroups.findAll()
        }
        break;
    case "delete": 
        if (args[1] === "contacts") {
            Contacts.delete(args[2])
        } else if (args[1] ==="groups") {
            Groups.deleteGroup(args[2])
        } else if (args[1] === "contacts_group") {

        }
        break;
    default:
        break;
}