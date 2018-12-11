const argv = process.argv.slice(2);
const command = argv[0];
const Controller = require('./controller.js');

switch (command) {
  case 'showContacts':
    Controller.allContacts();
    break;
    
}
