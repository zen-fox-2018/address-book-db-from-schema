const ContactController = require('./controllers/conController')
const ConGroupController = require('./controllers/conGroupController')
const groupController = require('./controllers/groupController')
const Controller = require('./controllers/Controller')

const argv = process.argv.slice(2)
const table = argv[0]

switch (table) {
  case 'contact':
      ContactController.execute(argv.slice(1))
    break;
  case 'contactGroup':
      ConGroupController.execute(argv.slice(1))
    break;
  case 'group':
      groupController.execute(argv.slice(1))
    break;
  default: Controller.help()
    break;
}
