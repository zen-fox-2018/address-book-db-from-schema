const Group = require('../models/group');
const GroupView = require('../views/group')

class GroupController {
  static listGroup() {
    Group.listGroup((err, groups) => {
      if (err) {
        GroupView.showErr(err);
      } else {
        GroupView.showData(groups);
      }
    })
  }

  static addGroup(data){
    Group.addGroup(data, (err) => {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          GroupView.showErr(`Group Name already exists`);
        } else {
          GroupView.showErr(err);
        }
      } else {
        let input = {
          name : data[0]
        }
        GroupView.showSuccess(`Successfully insert data ${JSON.stringify(input)}`)
      }
    })
  }

  static deleteGroup(data) {
    Group.deleteGroup(data, (err) => {
      if (err) {
        GroupView.showErr(err);
      } else {
        GroupView.showSuccess(`Group deleted`);
      }
    })
  }
}

module.exports = GroupController;
