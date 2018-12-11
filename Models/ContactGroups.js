const db = require(`../db`)

class ContactGroups {
    static create(contactName, groupName, cb) {
        let qCreate = `INSERT INTO ContactGroups (
            contact_id, group_id
        ) VALUES (
            "${contactName}", "${groupName}"
        )`

        db.run(qCreate, function (err, data) {
            err ?
                cb(err, null) :
                cb(null, this)
        })
    }
}

module.exports = ContactGroups