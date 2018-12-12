
const db = require('../database/connection.js')

class GroupContact{
    constructor(groupId, contactId){
        this.groupId = groupId,
        this.contactId = contactId
    }

    static insert(newGroupContact, cb){
        let query = 
        `INSERT INTO Contacts_Groups (Groups_Id, Contacts_Id)
        VALUES ('${newGroupContact.groupId}','${newGroupContact.contactId}')`

        db.run(query, function(err){
            if(err){
                cb(err)
            }
        })
    }
}

module.exports = GroupContact