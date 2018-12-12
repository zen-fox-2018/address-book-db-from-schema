const Contact = require('../Models/contact')
const GroupContact = require('../Models/contact-group')
const View = require('../Views/view')

class ContactControllers {

    static showall() {
        Contact.findAll(function (err, data) {
            if (err) {
                View.displayErr(err)
            } else {
                View.displaySuccess(data)
            }
        })
    }

    static findById(input) {
        let search = {field:"id", value: Number(input[0])}
        Contact.findOne(search, function (err, row) {
            if (err) {
                View.displayErr(err)
            } else {
                if(row.id === undefined) {
                    View.displayErr(`data dengan id : ${input[0]} tidak ditemukan`)
                } else {
                    View.displaySuccess(row)
                }
            }
        })
    }

    static addContact(input) {
        let kontak = {
            name: input[0],
            company:input[1],
            phone: input[2],
            email:input[3]
        }
        let newcontact = new Contact(kontak)
        // console.log(newcontact)
        newcontact.create(function (err) {
            if (err) {
                View.displayErr(err)
            } else {
                // console.log(data)
                let obj = {field:"email",value:newcontact.email}
                Contact.findOne(obj, function(err, row) {
                    if (err) {
                        View.displayErr(err)
                    } else {
                        console.log(row)
                        Contact.countContact( function(err, length){
                            if (err) {
                                View.displayErr(err)
                            } else {
                                View.displaySuccess(`berhasil add Contact ${JSON.stringify(row)}, total Contact : ${length}`)
                            }
                        })
                    }
                })
            }
        })
    }

    static delete(input) {
        let search= {
            field: "email",
            value: input[0]
        }
        Contact.findOne(search, function(err, row) {
            if (err) {
                View.displayErr(err)
            } else {
                console.log(row)
            }
        })
    }

    static update(input) {
        let search = {
            field: "email",
            value: input[0]
        }
        Contact.findOne(search, function(err,row) {
            if (err) {
                View.displayErr(err)
            } else {
                if(row._id === undefined) {
                    View.displayErr('email belum terdaftar')
                } else {
                    row[input[1]] = input[2]
                    row.update(input[1], function(err,data) {
                        if (err) {
                            View.displayErr(err)
                        } else {
                            View.displaySuccess(`berhasil mengupdate ${data.changes} data`)
                        }
                    })
                }
            }
        })
    }

    static addGrroup(input) {
        let caricontact = {
            field: "email",
            value: input[0]
        }
     Contact.findOne(caricontact,function(err,dataContact) {
        if (err) {
            View.displayErr(err)

        } else {
            if (dataContact.id === undefined) {
                View.displayErr('email belum terdaftar')
            } else {
                let contact = dataContact
            }
        }
     })
    }


}

module.exports = ContactControllers