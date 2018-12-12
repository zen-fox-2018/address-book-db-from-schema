const ContactController = require('./controllers/contact');
// const PatientController = require('./controllers/patient.js');

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

      default:
        ContactController.showErr(`Masukkan sintax yang benar.`);
    }
  }
}

const argv = process.argv.slice(2);
const contact = new Contact(argv);

contact.start();
