const Group = require('../models/Group')
const View = require('../view/View')

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
        Group.findOne(input, function(err, groupData) {
            if(err) {
                View.displayError('Err : ', err)
            } else {
                groupData.delete(input, function(err) {
                    if(err) {
                        View.displayError('Err : ', err)
                    } else {
                        View.displaySuccess('Success Delete Group')
                    }
                })
            }
        })
    }
}

module.exports = Controller
