const db = require('./Connection');
class ContactGroup {
    constructor(group_id, contact_id) {
        this.group_id = group_id;
        this.contact_id = contact_id;
    }

    static insertContactGroup(groupId, contactId, callback) {
        let query = `
            INSERT INTO GroupsContact
            (groupId, contactId)
            VALUES
            (${groupId}, ${contactId})`
        db.run(query, function(err) {
            if (err) {
                callback(err)
            }
        })
    }

    static findAll(callback) {
        let query = `SELECT * FROM GroupsContact`;

        db.all(query, function(err, allData) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, allData)
            }
        })
    }

    static updateData(target, value, condition, callback) {
        let query = `
            UPDATE GroupsContact
            SET "${target}" = "${value}"
            WHERE "${condition}"`
        db.run(query, function(err) {
            if (err) {
                callback(err)
            }
        })
    }

}
module.exports = ContactGroup;