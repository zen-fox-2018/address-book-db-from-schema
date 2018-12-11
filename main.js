const Controller = require('./controllers/Controller')

let argv = process.argv.slice(2)

switch(argv[0]) {
    case 'showContact':
        Controller.showContact()
        break;
    case 'showGroup':
        Controller.showGroup()
        break;
    case 'insertContact':
        Controller.addContact(argv[1], argv[2], argv[3], argv[4])
        break;
    case 'insertGroup':
        Controller.addGroup(argv[1])
        break;
    case 'updateContact':
        Controller.updateContact(argv[1], argv[2], argv[3], argv[4], argv[5])
        break;
    case 'updateGroup':
        Controller.updateGroup(argv[1], argv[2])
        break;
    case 'deleteContact':
        Controller.deleteContact(argv[1])
        break;
    case 'deleteGroup':
        Controller.deleteGroup(argv[1])
        break;
}