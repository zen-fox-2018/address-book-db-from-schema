const argv = process.argv.slice(2)
const ContactController = require('./controllers/contactController')
const GroupController = require('./controllers/groupController')
const ContactGroupController = require('./controllers/contactGroupController')

let input = null

switch (argv[0]) {
    case 'contact' :
        if(argv[1] === 'register') {
            input = {
                name: argv[2],
                company: argv[3],
                phone: argv[4],
                email: argv[5]
            }
            ContactController.register(input)
        } else if (argv[1] === 'update') {
            input = {
                id: argv[2],
                field: argv[3],
                value: argv[4]
            }
            ContactController.update(input)
        } else if (argv[1] === 'delete') {
            ContactController.delete(argv[2])
        } else if (argv[1] === 'showContact') {
            ContactController.showAll()
        }
    break;

    case 'group' :
        if(argv[1] === 'register') {
            GroupController.register(argv[2])
        } else if (argv[1] === 'update') {
            input = {
                id: argv[2],
                field: argv[3],
                value: argv[4]
            }
            GroupController.update(input)
        } else if (argv[1] === 'delete') {
            input = {
                id: argv[2]
            }
            GroupController.delete(input)
        }
    break;

    case 'groupContact' :
        if(argv[1] === 'register') {
            input = {
                contactId : argv[2],
                groupId : argv[3]
            }
            ContactGroupController.register(input)
        } else if (argv[1] === 'update') {
            input = {
                id: argv[2],
                field: argv[3],
                value: argv[4]
            }
            ContactGroupController.update(input)
        } else if (argv[1] === 'delete') {
            input = {
                id: argv[2]
            }
            ContactGroupController.delete(input)
        }
    break;

    default:
        ContactController.help()
    break;
}
