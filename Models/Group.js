const db = require(`../db`)

class Group {
    constructor(input) {
        this.id = input ? input.id : null
        this.name = input ? input.name : null
    }
    static findAll() {

    }

    static findOne(whereCase, whereStatus, cb) {
        let qFindOne = `SELECT * FROM Groups WHERE ${whereCase} = "${whereStatus}"`
        db.get(qFindOne, function (err, row) {
            let self;
            row ?
                self = new Group({
                    id: row.id,
                    name: row.name
                }) :
                self = new Group()

            err ?
                cb(err, null) :
                cb(null, self)
        })
    }

    create(name, cb) {
        let qCreate = `INSERT INTO Groups (
            name
        ) VALUES (
            "${name}"
        )`

        db.run(qCreate, function (err) {
            err ?
                cb(err, null) :
                cb(null, this)
        })

    }

    save(column, colStatus, whereCase, whereStatus) {
        let qSave = `UPDATE Group SET ${column} = "${colStatus}" WHERE ${whereCase} = "${whereStatus}"`

    }

    delete(whereCase, whereStatus, cb) {
        let qDelete = `DELETE FROM Groups WHERE ${whereCase} = "${whereStatus}"`
        db.run(qDelete, function (err, data) {
            err ?
                cb(err, null) :
                cb(null, this)
        })
    }

    update(groupName, whereCase, newStatus, cb) {
        let qUpdate = `UPDATE Groups SET ${whereCase} = "${newStatus}" WHERE name = "${groupName}"`
        db.run(qUpdate, function (err) {
            err ?
                cb(err, null) :
                cb(null, this)
        })
    }
}

module.exports = Group