const Contact = require('../models/Contact')
const View = require('../views/View')
const ContactGroup = require('../models/ContactGroup')

class ContactController {
  static execute(input) {
    let command = input[0]
    let option = input.slice(1)

    switch (command) {
      case 'add': ContactController.add(option)
        break;
      case 'update': ContactController.update(option)
        break;
      case 'show': ContactController.show()
        break;
      case 'delete': ContactController.delete(option)
        break;
      case 'find': ContactController.find(option)
        break;
      default: View.disErr(`no such command!`)
        break;
    }
  }

  static add(input) {
    let obj = {
      name: input[0], 
      company: input[1],
      phone: input[2],
      email: input[3]
    }
    let newContact = new Contact(obj)
    newContact.save((err, data) => {
      if(err) {
        View.disErr(err)
      } else {
        Contact.findOne({where: 'id', value: data.lastID}, (err, contact) => {
          if(err) {
            View.disErr(err)
          } else {
            View.display(`save data` , contact)
          }
        })
      }
    })
  }
  
  static update(input) {
    let obj = {
      where: 'email',
      value: input[0]
    }

    Contact.findOne(obj, (err, row) => {
      if(err) {
        View.disErr(err)
      } else {
        if (row) {
          let info = {
            set: input[1], 
            where: 'email',
            setVal: input[2]
          }
          row.update(info, (err, data) => {
            if(err) {
              View.disErr(err)
            } else {
              View.display(`Updating data `, row)
            }
          })
        } else {
          View.disErr(`User not found!`)
        }
      }
    })
  }

  static delete (email) {
    let obj  = {
      where: 'email',
      value: email[0] 
    }
    Contact.findOne(obj, (err, row) => {
      if(err){
        View.disErr(err)
      } else {
        row.delete(obj, (err, data) => {
          if(err) {
            View.disErr(err)
          } else {
            View.display(`delete data:`, row)
          }
        })
      }
    })
  }

  static show(){
    Contact.findAll((err, rows) => {
      if(err) {
        View.disErr(err)
      } else {
        View.display(`showing data\n`, rows)
      }
    })
  }

  static find(input) {
    Contact.findOne({where: input[0],value: input[1]}, (err, row) => {
      if(err) {
        View.disErr(err)
      } else {
        if(row) {
          View.display(`finding one data`, row)
        } else {
          View.disErr(`data not found`)
        }
      }
    })
  }
}
module.exports = ContactController