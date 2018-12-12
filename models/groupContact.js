const db = require('../db/connection')
class GroupContact {
  constructor(obj) {
    this.id = obj.id;
    this.contactId = obj.contactId;
    this.groupId = obj.groupId;
  }

  static listGroupContact(callback) {
    const query = `
      SELECT
        *
      FROM
        groupContacts;
    `;
    db.all(query, (err, groupContacts) => {
      if (err) {
        callback(err, null);
      } else {
        let dataGroupContacts = [];
        groupContacts.forEach( c => {
          dataGroupContacts.push(new GroupContact(c));
        })
        callback(null, dataGroupContacts);
      }
    })
  }

  static addGroupContact(data, callback) {
    let newData = {
      contactId : data[0],
      groupId : data[1]
    };
    let newGroupContact = new GroupContact(newData);
    newGroupContact.save((err) => {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    });
  }

  static showGroup(data, callback) {
    const query = `
      SELECT
        groups.name as groupName
      FROM
        groups, groupContacts
      WHERE
        groups.id = groupContacts.groupId AND
        groupContacts.contactId = ${data};
    `;

    db.all(query, (err, groups) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, groups);
      }
    })
  }

  static updateGroupContact(data, callback) {
    let email = data[0];
    data = data.slice(1);
    let setValue = '';
    for (let i = 0; i < data.length - 1; i+=2) {
      setValue += `${data[i]} = "${data[i+1]}"`;
      if (i < data.length - 2) {
        setValue += ', '
      }
    }
    const query = `
      UPDATE groupContacts
      SET
        ${setValue}
      WHERE
        email = "${email}";
    `

    db.run(query, function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, this);
      }
    })
  }

  static deleteGroupContact(data, callback) {

    let whereValue = '';
    for (let i = 0; i < data.length - 1; i+=2) {
      whereValue += `${data[i]} = "${data[i+1]}"`;
      if (i < data.length - 2) {
        whereValue += ' AND '
      }
    }

    const query = `
      DELETE
      FROM groupContacts
      WHERE
        ${whereValue};
    `;

    db.run(query, function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, this);
      }
    })
  }

  save(callback) {
    const query = `
      INSERT INTO groupContacts
        (contactId, groupId)
      VALUES
        (${this.contactId}, ${this.groupId});
    `;
    db.run(query, (err) => {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    })
  }
}

module.exports = GroupContact;
