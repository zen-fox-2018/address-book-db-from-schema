const db = require('../database/connection.js')
const fs = require('fs')

class Contact {
    constructor(name,company, phone, email){
        this.name = name || 'Unknoz'
        this.company = company || 'Good Company '
        this.phone = phone || '01-2345-6789'
        this.email = email || 'default@meil.zxc'
    }

    static readDatabase(cb){
        let query = `SELECT * FROM Contacts `
        db.all(query, function(err, rows){
            if(err){
                cb(err,null)
            }
            else {
                let data = []
                // console.log(rows[0][1])
                for(let i = 0; i <rows.length; i++){
                    data.push(new Contact(rows[i].name, rows[i].company,rows[i].phone,rows[i].email))
                }
                cb(null,data)
            }
        })
    }

    static createRowDatabase(newData, cb) {
        let query = `INSERT INTO Contacts(name, company, phone, email)
        VALUES (
            "${newData.name}",
            "${newData.company}",
            "${newData.phone}",
            "${newData.email}"
        )`
        db.run(query,function(err){
            if(err){
                cb(err)
            }else {
                cb(null)
            }
        })
    }

    static DeleteById(id,cb) {
        let query = `DELETE FROM Contacts WHERE id = ${id}`
        db.run(query, function(err){
            if(err){
                cb(err)
            }else {
                cb(null)
            }
        })
    }


}

// Contact.readDatabase(function(err, data){
//     if(err) console.log(err)
//     else console.log(data)
// })

module.exports = Contact


