const GroupContact = require('../models/ContactGroup')
const View = require('../view/View')

class Controller {
    static register(input) {
        let groupContact = new GroupContact(null, input.contactId, input.groupId)
        groupContact.create(function(err) {
            if(err) {
                View.displayError('Err :', err)
            } else {
                View.displaySuccess(`Success Create Data`)
            }
        })
    }

    static update(input) {
        GroupContact.findOne(input.id, function(err, dataGC) {
            if(err) {
                console.log(dataGC)
                View.displayError('Err : ', err)
            } else {
                if(!dataGC) {
                    View.alert(`No Data Found!!`)
                } else {
                    dataGC.update(input, function(err) {
                        if(err) {
                            View.displayError('Err : ', err)
                        } else {
                            View.displaySuccess(`Success changed data`)
                        }
                    })
                }
            }
        })
    }

    static delete(input) {
        GroupContact.findOne(input, function(err, dataGC) {
            if(err) {
                View.displayError('Err : ', err)
            } else {
                if(!dataGC) {
                    View.alert(`No Data Found!!`)
                } else {
                    dataGC.delete(dataGC.id, function(err) {
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

    static showAll() {
        GroupContact.showAll(function(err) {
            if(err) {
                View.displayError(err)
            } else {
                View.displaySuccess()
            }
        })
    }
}

module.exports = Controller
