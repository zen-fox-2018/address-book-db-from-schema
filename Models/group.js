const db = require('./Connection');

class Group {
    constructor(name) {
        this.name = name;
    }
    static create(name){
        let query = `
            INSERT INTO Contact
            (Name)
            VALUES
            ("${name}")`
        db.run(query, function(err) {
            if (err) {
                callback(err)
            }
        })
    }
}
module.exports = Group;