const db = require('../db/connection')
class Group {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
  }

  static listGroup(callback) {
    const query = `
      SELECT
        *
      FROM
        groups;
    `;
    db.all(query, (err, groups) => {
      if (err) {
        callback(err, null);
      } else {
        let dataGroups = [];
        groups.forEach( c => {
          dataGroups.push(new Group(c));
        })
        callback(null, dataGroups);
      }
    })
  }

  static addGroup(data, callback) {
    let newData = {
      name : data[0]
    };
    let newGroup = new Group(newData);
    newGroup.save((err) => {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    });
  }

  static findByOne(data, callback) {
    let whereValue = '';
    for (let i = 0; i < data.length - 1; i+=2) {
      whereValue += `${data[i]} = "${data[i+1]}"`;
      if (i < data.length - 2) {
        whereValue += ' AND '
      }
    }
    const query = `
      SELECT
        *
      FROM
        groups
      WHERE
        ${whereValue}
    `;

    db.all(query, (err, groups) => {
      if (err) {
        callback(err, null);
      } else {
        let dataGroups = [];
        groups.forEach( c => {
          dataGroups.push(new Group(c));
        })
        callback(null, dataGroups);
      }
    })
  }

  static updateGroup(data, callback) {
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
      UPDATE groups
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

  static deleteGroup(data, callback) {
    let email = data[0];
    const query = `
      DELETE
      FROM groups
      WHERE
        email = "${email}";
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
      INSERT INTO groups
        (name)
      VALUES
        ("${this.name}");
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
