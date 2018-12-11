const Group = require('../models/Group') 
const View = require('../views/View')

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
    Group.findAll((err, rows) => {
      if(err) {
        View.disErr(err)
      } else {
        View.display(`showing data\n`, rows)
      }
    })
  }
}
module.exports = GroupController