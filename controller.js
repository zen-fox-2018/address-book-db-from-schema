
const contacts = require('./contact.js')

class controller {
    static findAll(input){
        contacts.showAll(input,function(err,data){
            if(err){
                console.log(err)
            }else {
                console.log(data)
            }
        })
    }
}

module.exports = controller