const command = process.argv.slice(2)
const Controller = require('./controller/controller.js')

// switch (command[0]) {
//     case 'showAll':
//         Controller.showAllDataInContact()
//         break;

//     default:
//         break;
// }

class Index {
    constructor(command) {
        this.command = command
    }

    showAll() {
        switch (this.command[0]) {
            case 'showAll':
                Controller.showAllDataInContact()
                break;
            case 'save':
                let name = command[1]
                let company = command[2]
                let phone = command[3]
                let email = command[4]
                Controller.registerNewContact(name,company,phone,email)
                break;
            case 'delete':
                Controller.deleteDataContactbyId(command[1])
            default:
                break;
        }
    }
}

let apalah = new Index(command)
apalah.showAll()