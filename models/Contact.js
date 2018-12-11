const db = require('../Database/Connector')

class Contact {
    constructor(obj) {
        this.id = obj['id']
        this.name = obj['name']
        this.company = obj['company']
        this.phone_number = obj['phone_number']
        this.email = obj['email']
    }

    static findAll(callback) {
        db.all(`SELECT contacts.id, contacts.name, contacts.company, contacts.phone_number, contacts.email, COUNT(*) AS totalGroup FROM contactgroups
                JOIN contacts 
                ON contacts.id = contactgroups.contact_id
                JOIN groups
                ON contactgroups.group_id = groups.id
                GROUP BY contacts.id; `,
            (err, rows)=> {
            if(err) callback(err, null)
            else {
                // let result = []
                // for(let i = 0; i < rows.length; i++) {
                //     result.push(new Contact(rows[i]))
                // }
                callback(null, rows)
            }
        })
    }

    static insertDataContact(name, company, phone_number, email, callback) {
        db.run(`INSERT INTO contacts VALUES(null , "${name}", "${company}", "${phone_number}", "${email}");`,
        (err)=> {
            if(err) callback(err)
            else callback(null)
        })
    }

    static updateDataContactID(id, name, company, phone_number, email, callback) {
        db.run(`UPDATE contacts 
                    SET 
                    name = "${name}",
                    company = "${company}",
                    phone_number = "${phone_number}",
                    email = "${email}"
                WHERE id = ${id};`, (err)=> {
                    if(err) callback(err)
                    else callback(null)
                })
    }

    static deleteContactID(id ,callback) {
        db.run(`DELETE FROM contacts WHERE id = ${id};`,
        (err)=> {
            if(err) callback(err)
            else callback(null)
        })
    }
}

    // Contact.updateDataContactID(51, "Christian Sihotang", "Google Inc", "0819-272-84401", "christian.sihotang23@gmail.com", (err)=> {
    //     if(err) console.log(err);
    //     else console.log('success');
        
    // })
    // Contact.insertDataContact( "Christian Sihotang", "Google Inc", "0819-272-84401", "christian.sihotang23@gmail.com", 
    //     (err)=>{
    //         if(err) console.log(err);
    //         else console.log('Berhasil add Data');
            
    //     })
    // Contact.findAll((err,data)=> {
    //     if(err) console.log(err);
    //     else console.log(data);
        
    // })
    // Contact.deleteContactID(51, (err)=>{
    //     if(err) console.log(err);
    //     else console.log('Berhasil Delete');
        
    // })

    module.exports = Contact