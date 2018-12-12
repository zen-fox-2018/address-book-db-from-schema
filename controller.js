const Contact = require('./model/contact.js')
const Group = require('./model/group.js')
const GroupContact = require('./model/contact-group.js')
const View = require('./view.js')

class Controller {
    static showContact(name){
        Contact.showContact(name, function(err, data){
            if (err){
                View.error(err, "error show data")
            }   else{
                View.display(data)
            }
        })
    }

    static showGroup(name){
        Group.showContact(name, function(err, data){
            if (err){
                View.error(err, "error show data")
            }   else{
                View.display(data)
            }
        })
    }

    static saveContact(name, company, number, email){
        let newContact = new Contact(name, company, number, email)

        Contact.insert(newContact, function(err){
            View.error(err, 'insertion error')
        })
    }

    static saveGroup (name){
        let newGroup = new Group(name)

        Group.insert(newGroup, function(err){
            View.error(err, 'insertion error')
        })
    }

    static saveGroupContact (Groups_Id, Contacts_Id){
        let newGroupContact = new GroupContact(Groups_Id, Contacts_Id)

        GroupContact.insert(newGroupContact, function(err){
            View.error(err, 'insertion error')
        })
    }

    static updateContact (column, value, id){
        Contact.update(column, value, id, function(err){
            if(err){
                View.err(err, 'update error')
            }
        })
    }

    static updateGroup (column, value, id){
        Group.update(column, value, id, function(err){
            if(err){
                View.err(err, 'update error')
            }
        })
    }

    static deleteContact (){
        Contact.delete( function(err){
            if(err){
                View.err(err, 'deletion error')
            }
        })
    }

    static deleteGroup (){
        Group.delete( function(err){
            if(err){
                View.err(err, 'deletion error')
            }
        })
    }

    static assignContact(ContactName, GroupName){
        Contact.findWhere(name, ContactName, function(err, dataContact){
            if(err){
                View.err(err)
            }   else{
                Contacts_Id = dataContact.id
            }
        })

        Group.findWhere(name, GroupName, function(err, dataGroup){
            if(err){
                View.err(err)
            }   else{
                Groups_Id = dataGroup.id
            }
        })

        let newGroupContact = new GroupContact(Groups_Id, Contacts_Id)

        GroupContact.insert(newGroupContact, function(err){
            View.error(err, 'insertion error')
        })
    }

}

module.exports = Controller