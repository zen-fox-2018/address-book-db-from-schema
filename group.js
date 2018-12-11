const db = require('./setup.js')

class Grup {
    constructor(nama) {
        this.name = nama
    }

    static create (nama, callback) {
        let query = `
                    INSERT INTO Groups (nama)
                    VALUES
                    ("${nama}")
        `
        db.run(query, function(err){
            if(err) {
                callback(err, null)
            }else{
                let obj = new Grup (nama)
                callback (null, obj)
            }
        })
    }

    static findAll (callback) {
        let query = `
                    SELECT *
                    FROM Groups
        `
        db.get (query, function(err, data) {
            if(err) {
                callback(err, null)
            }else{
                let contact = []
                for(let i = 0; i < data.length; i++) {
                    let obj = new Grup(data[i].nama)
                    contact.push(obj)
                }
                callback(null, contact)
            }
        })
    }

    static update (field, value, id, callback) {
        let update = `
                    UPDATE Groups
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


// Grup.findAll(function(err, data) {
//     if(err) {
//         console.log(err)
//     }else{
//         console.log(data)
//     }
// })
module.exports = Grup