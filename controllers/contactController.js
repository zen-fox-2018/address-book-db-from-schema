const Contact = require('../models/Contact')
const View = require('../view/View.js')

class Controller {
    static help() {
        View.help()
    }

    static register(input) {
        let contact = new Contact(null, input.name, input.company, input.phone, input.email)
        contact.create(function(err) {
            if(err) {
                View.displayError('Err :', err)
            } else {
                View.displaySuccess(`Success Create ${input.name} as New Contact`)
            }
        })
    }

    static update(input) {
        Contact.findOne('id', input.id, function(err, dataContact) {
            if(err) {
                View.displayError('Err : ', err)
            } else {
                if(!dataContact) {
                    View.alert(`No Data Found!!`)
                } else {
                    //kalau udah instance di model, sudah membalikkan class obj, jadi hasil balikan bisa langsung di pakai
                    dataContact.update(input, function(err) {
                        if(err) {
                            View.displayError('Err : ', err)
                        } else {
                            View.displaySuccess(`Success changed ${dataContact.name} company to ${input.value}`)
                        }
                    })
                }
            }
        })
    }

    static delete(input) {
        Contact.findOne('id', input, function(err, dataContact) {
            if(err) {
                View.displayError('Err : ', err)
            } else {
                if(!dataContact) {
                    View.alert(`No Data Found!!`)
                } else {
                    dataContact.delete(dataContact.id, function(err) {
                        if(err) {
                            View.displayError('Err : ', err)
                        } else {
                            View.displaySuccess('Success delete data')
                        }
                    })
                }
            }
        })
    }
}

module.exports = Controller
