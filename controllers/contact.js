const Contact = require('../models/contact');
const ContactView = require('../views/contact')

class ContactController {
  static listContact() {
    Contact.listContact((err, contacts) => {
      if (err) {
        ContactView.showErr(err);
      } else {
        ContactView.showData(contacts);
      }
    })
  }

  static addContact(data){
    Contact.addContact(data, (err) => {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          ContactView.showErr(`Email already exists`);
        } else {
          ContactView.showErr(err);
        }
      } else {
        let input = {
          name : data[0],
          company : data[1],
          phoneNumber : data[2],
          email : data[3]
        }
        ContactView.showSuccess(`Successfully insert data ${JSON.stringify(input)}`)
      }
    })
  }

  static deleteContact(data) {
    Contact.deleteContact(data, (err) => {
      if (err) {
        ContactView.showErr(err);
      } else {
        ContactView.showSuccess(`Contact deleted`);
      }
    })
  }

  static joinContact(data) {
    Contact.assignContact(data, (err) => {
      if (err) {
        ContactView.showErr(err);
      } else {
        ContactView.showSuccess(`Contact Joined`);
      }
    })
  }

  static showContact(email) {
    Contact.showContact(email , (err,data) =>{
      if (err) {
        ContactView.showErr(err);
      } else {
        ContactView.showData(data);
      }
    })
  }
}

module.exports = ContactController;
