const argv = process.argv.slice(2)
const ContactController = require('./controllers/ContactController')

const command = argv[0]
// name company phone email
switch (command) {
    case 'create':
        if (argv[1] === 'contact') {
            let obj = {
                name: argv[2],
                company: argv[3],
                phone: argv[4],
                email: argv[5]
            }
            ContactController.create(obj)
        } else if (argv[1] === 'group') {
            obj = {
                name: argv[2],
            }
            ContactController.create(obj)
        }
        break;

    case 'update':
        if (argv[1] === 'contact') {
            ContactController.update(argv.slice(2))
        }
        break;

    case 'delete':
        if (argv[1] === 'contact') {
            ContactController.delete(argv[2])
        }
        break;

    case 'join':    //  join grupName emailContact
        obj = {
            name: argv[1],
            email: argv[2]
        }
        ContactController.join(obj)
        break;

    case 'show': 
        if (argv[1] === 'contact') {
            ContactController.show(argv[2])
        }
        break;
    default:
        break;
}