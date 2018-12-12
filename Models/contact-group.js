
const db = require('../db')

class ContactGroup {
    constructor(object) {
        this._id = object.id;
        this._contactId = object.contactId;
        this._groupId = object.groupId;
    }


    static execute(query,input, callback) {
        db.run(query, input, function (err) {
            if (err) {
                callback(err)
            } else {
                callback(null, this)
            }
        })
    }

    create (callback) {
        let query = `
            INSERT INTO ContactGroups (contactId, groupId)
            VALUES (?,?)`
            let input = Object.values(this).filter(element => element !== undefined)
            console.log(input)
    
           ContactGroup.execute(query, input, function (err,data) {
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
        ContactGroup.execute(query,input, function (err, data){
            if (err) {
                callback(err)
            } else {
                callback(data)
            }
        })
    }

}

module.exports = ContactGroup