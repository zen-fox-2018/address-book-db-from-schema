const Group = require('../models/Group')
const View = require('../view/View')
const ContactGroup = require('../models/ContactGroup')

class Controller {
    static register(input) {
        let group = new Group(null, input)
        group.create(function(err) {
            if(err) {
                View.displayError('Err :', err)
            } else {
                View.displaySuccess(`Success Create ${input}`)
            }
        })
    }

    static update(input) {
        Group.findOne(input, function(err, groupData) {
            if(err) {
                View.displayError('Err : ', err)
            } else {
                groupData.update(input, function(err) {
                    if(err) {
                        View.displayError('Err : ', err)
                    } else {
                        View.displaySuccess('Succes Update Group')
                    }
                })
            }
        })
    }

    static delete(input) {
        ContactGroup.findById(input, function(err, dataCG) {
            if(err) {
                View.displayError('Err :', err)
            } else {
                for(let i = 0; i < dataCG.length; i++) {
                    ContactGroup.delete(dataCG[i], function(err) {
                        if(err) {
                            View.displayError(err)
                        } else {
                            Group.findById(input, function(err, dataGroup) {
                                if(err) {
                                    View.displayError('Err :, ', err)
                                } else {
                                    console.log(dataGroup)
                                    dataGroup.delete(dataGroup, function(err) {
                                        if(err) {
                                            View.displayError('Err : ', err)
                                        } else {
                                            View.displaySuccess('Delete Group Success')
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    }
}

module.exports = Controller
