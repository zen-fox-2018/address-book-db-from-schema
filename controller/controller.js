const Contact = require('../models/Contact.js')
const View = require('../view/view.js')

class AddressBookController {

    static deleteDataContactbyId(id){
        Contact.DeleteById(id,function(err){
            if(err){
                View.showErrorMessage(err)
            }
            else {
                Contact.readDatabase(function(errRead,data){
                    if(err){
                        View.showErrorMessage(errRead)
                    }
                    else {
                        View.showDeleteMessage(data)
                    }
                })
            }
        })
    }
    static showAllDataInContact(){
        Contact.readDatabase(function(err,data){
            if(err){
                View.showErrorMessage(err)
            }
            else {
                View.showMessage(data)
            }
        })
    }

    static registerNewContact(name,company,phone,email){
        let objContact = {
            name : name,
            company : company,
            phone: phone,
            email : email
        }
        Contact.createRowDatabase(objContact, function(err){
            if(err){
                View.showErrorMessage(err)
            }
            else {
                Contact.readDatabase(function(errRead,data){
                    if(err){
                        View.showErrorMessage(errRead)
                    }
                    else {
                        View.showSuccessMessage(data)
                    }
                })
            }
        })
    }
}

module.exports = AddressBookController