const ContactController = require('./controllers/contact');
const GroupController = require('./controllers/group');

class Contact {
  constructor(command) {
    this.command = command;
  }

  start() {
    switch (this.command[0]) {
      case 'listContact':
        ContactController.listContact();
        break;
      case 'addContact':
        ContactController.addContact(this.command.slice(1));
        break;
      case 'deleteContact':
        ContactController.deleteContact(this.command.slice(1));
        break;
      case 'joinContact':
        ContactController.joinContact(this.command.slice(1));
        break;
      case 'showContact':
        ContactController.showContact(this.command.slice(1));
        break;

      case 'listGroup':
        GroupController.listGroup();
        break;
      case 'addGroup':
        GroupController.addGroup(this.command.slice(1));
        break;
      case 'deleteGroup':
        GroupController.deleteGroup(this.command.slice(1));
        break;

      default:
        ContactView.showErr(`Masukkan sintax yang benar.`);
    }
  }
}

const argv = process.argv.slice(2);
const contact = new Contact(argv);

contact.start();
