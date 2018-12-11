const db = require('./setup.js')

class ContactGroup {
    constructor(contactId, groupsId) {
        this.contactId = contactId
        this.groupsId = groupsId
    }

    static create (contactId, groupsId, callback) {
        let query = `
                    INSERT INTO ContactGroups (ContactId, GroupsId)
                    VALUES
                    (${Number(contactId)}, ${Number(groupsId)})
        `
        db.run(query, function(err){
            if(err) {
                callback(err, null)
            }else{
                let obj = new ContactGroup (contactId, groupsId)
                callback (null, obj)
            }
        })
    }

    static findAll () {
        let query = `
                    SELECT *
                    FROM ContactGroups
        `
        db.all (query, function(err, data) {
            if(err) {
                callback(err, null)
            }else{
                let contact = []
                for(let i = 0; i < data.length; i++) {
                    let obj = new Contact(nama, perusahaan, telp, email)
                    contact.push(obj)
                }
                callback(null, contact)
            }
        })
    }

    static update (field, value, id, callback) {
        let update = `
                    UPDATE ContactGroups
                    SET ${field} = "${value}"
                    WHERE Contacts.id = ${Number(id)}
        `
        db.run(update, function(err) {
            if(err) {
                callback(err)
            }else {
                callback(null)
            }
        })
    }

    
}

module.exports = ContactGroup;