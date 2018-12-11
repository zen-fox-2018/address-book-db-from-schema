const Contact = require('./models/contact.js');
const View = require('./view.js');

class Controller {

    static showContact() {
        Contact.findAll((err, dataCp) => {
            if (err) {
                View.showErr(err);
            } else {
                View.showData(dataCp);
            }
        });
    }
}

module.exports = Controller;