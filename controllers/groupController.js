const Group = require('../models/Group') 
const View = require('../views/View')
const ContactGroup = require('../models/ContactGroup') 
const Contact = require('../models/Contact')

class GroupController {
  static execute(input) {
    let command = input[0]
    let option = input.slice(1)
    switch (command) {
      case 'add': GroupController.add(option)
        break;
      case 'update': GroupController.update(option)
        break;
      case 'show': GroupController.show()
        break;
      case 'delete': GroupController.delete(option)
        break;
      case 'invite': GroupController.invite(option)
        break;
      default: View.disErr(`no such command!`)
        break;
    }
  }

  static add(input) {
    let obj = {
      name: input[0]
    }
    let newGroup = new Group(obj)
    newGroup.save((err, data) => {
      if(err) {
        View.disErr(err)
      } else {
        Group.findOne({where: 'id', value: data.lastID}, (err, group) => {
          if(err) {
            View.disErr(err)
          } else {
            View.display(`save data` , group)
          }
        })
      }
    })
  }
  
  static update(input) {
    let obj = {
      where: 'id',
      value: input[0]
    }
    Group.findOne(obj, (err, row) => {
      if(err) {
        View.disErr(err)
      } else {
        if (row) {
          let info = {
            where: 'id',
            setVal: input[1]
          }
          row.update(info, (err, data) => {
            if(err) {
              View.disErr(err)
            } else {
              View.display(`Updating data id `, input[1])
            }
          })
        } else {
          View.disErr(`Group not found!`)
        }
      }
    })
  }

  static delete (id) {
    let obj  = {
      where: 'id',
      value: id[0] 
    }
    Group.findOne(obj, (err, row) => {
      if(err){
        View.disErr(err)
      } else {
        if(row) {
          ContactGroup.update({set: 'groupId', where: 'groupId', setVal: null, whereVal: row.id}, (err, data) => {
            if(err) {
              View.disErr(err)
            } else {
              if(data.changes == 0) {
                View.disErr(`Nothing changes`)
              } else {
                row.delete(obj, (err, data) => {
                  if(err) {
                    View.disErr(err)
                  } else {
                    View.display(`delete data:`, row)
                  }
                })
              }
            }
          })
        } else {
          View.disErr(`Group not found`)
        }
      }
    })
  }

  static show(){
    Group.findAll((err, rows) => {
      if(err) {
        View.disErr(err)
      } else {
        View.display(`showing data\n`, rows)
      }
    })
  }

  static invite(input) {
    let groupid = input[0]
    let email = input[1]

    Group.findOne({where:'id', value: groupid}, (err, rowGroup) => {
      if(err) {
        View.disErr(err)
      } else {
        Contact.findOne({where: 'email',value: email}, (err,rowContact) => {
          if(err) {
            View.disErr(err)
          } else {
            let newContactGroup = new ContactGroup({contactId: rowContact.id, groupId: rowGroup.id}) 
            newContactGroup.save((err ,dataThis) => {
              if(err) {
                View.disErr(err)
              } else {
                View.display(`invite ${rowContact.name} to ${rowGroup.name}`)
              }
            })
          }
        })
      }
    })

  }
}
module.exports = GroupController