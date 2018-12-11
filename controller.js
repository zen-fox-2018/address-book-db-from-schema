//const View = require('../view/view.js');
const Contact = require('./contact.js');

class Controller {
  static allContacts() {
    Contact.showAll((err, data) => {
      // if (err) {
      //   View.displayError(err);
      // } else {
      //   View.displayData(data);
      // }
      console.log(err);
      console.log(data);
    });
  }
}

module.exports = Controller;