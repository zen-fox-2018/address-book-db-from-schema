const ControllerContact = require(`./Controllers/ControllerContact`)
const ControllerGroup = require(`./Controllers/ControllerGroup`)
const argv = process.argv.slice(2)
const command = argv[0]
const type = argv[1]
const data = argv.slice(2)

switch (command) {
    case `contact`:
        switch (type) {
            case `create`:
                ControllerContact.create(data[0], data[1], data[2], data[3])
                break;

            case `delete`:
                ControllerContact.delete(data[0])

                break;

            case `update`:
                //contact update oldNum telephone_number newNum
                ControllerContact.update(data[0], data[1], data[2])

                break;

            case `addContactToGroup`:
                //contact addContactToGroup taqi lamtur
                ControllerContact.checkContactAndGroup(data[0], data[1])
                break;
            
            case `showContact`:
                ControllerContact.showContact()
                break;
            
            default:
                break;
        }
        break;

    default:
        switch (type) {
            case `create`:
                ControllerGroup.create(data[0])

                break;

            case `delete`:
                ControllerGroup.delete(data[0])

                break;

            case `update`:
                ControllerGroup.update(data[0], data[1], data[2])
                break;

        }
        break;
}


