
const db = require('../db')

class ContactGroup {
    constructor(Object) {
        this._id = object.id;
        this._contactId = obejct.contactId;
        this._groupId = object.groupId;

    }

    create () {
        let query = `
            INSERT INTO ContactGroups (group_name)
            VALUES (?)`
            let input = Object.values(this).filter(element => element !== undefined)
            console.log(input)
    
           Group.execute(query, input, function (err,data) {
                if (err) {
                    callback(err)
                } else {
                    callback(null,data)
                }
            })
    }


    delete (field, callback) {
        let query = `DELETE FROM ContactGroups WHERE ${field} = ?`
        let input = [this[field]]
        Contact.execute(query,input, function (err, data){
            if (err) {
                callback(err)
            } else {
                callback(data)
            }
        })
    }

}

module.exports = ContactGroup