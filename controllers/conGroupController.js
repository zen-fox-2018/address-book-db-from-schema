const View = require('../views/View')
const ContactGroup = require('../models/ContactGroup') 

class ContactGroupController {
  static execute(input) {
    let command = input[0]
    let option = input.slice(1)
  }

  // static add(input) {
  //   let obj = {
  //     name: input[0], 
  //     company: input[1],
  //     phone: input[2],
  //     email: input[3]
  //   }
  //   let newContact = new Contact(obj)
  //   newContact.save((err, data) => {
  //     if(err) {
  //       View.disErr(err)
  //     } else {
  //       Contact.findOne({where: 'id', value: data.lastID}, (err, contact) => {
  //         if(err) {
  //           View.disErr(err)
  //         } else {
  //           View.display(`save data` , contact)
  //         }
  //       })
  //     }
  //   })
  // }
  
  // static update(input) {
  //   let obj = {
  //     where: 'email',
  //     value: input[0]
  //   }

  //   ContactGroup.findOne(obj, (err, row) => {
  //     if(err) {
  //       View.disErr(err)
  //     } else {
  //       if (row) {
  //         let info = {
  //           set: input[1], 
  //           where: 'email',
  //           setVal: input[2]
  //         }
  //         row.update(info, (err, data) => {
  //           if(err) {
  //             View.disErr(err)
  //           } else {
  //             View.display(`Updating data `, row)
  //           }
  //         })
  //       } else {
  //         View.disErr(`Contact Group not found!`)
  //       }
  //     }
  //   })
  // }

  static delete (input) {
    let obj  = {
      where: 'contactId',
      value: input[0] 
    }
    ContactGroup.findOne(obj, (err, row) => {
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
    ContactGroup.findAll((err, rows) => {
      if(err) {
        View.disErr(err)
      } else {
        View.display(`showing data\n`, rows)
      }
    })
  }
}
module.exports = ContactGroupController