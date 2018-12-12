const readData = require('./readData');
const db = require('./db/connection');
class seedData {
  static seedContact(file ,callback) {
    readData.readData(file, (err, contacts) => {
      db.serialize((errSer) => {
        if (errSer) {
          callback(errSer)
        } else {
          contacts = contacts.slice(0,-1);
          contacts.forEach( (c, index) => {
            if (index > 0) {
              db.run(`
                INSERT INTO contacts
                (name,company,phoneNumber,email)
                VALUES
                ("${c[0]}", "${c[1]}", "${c[2]}", "${c[3]}");
                `, (errRun) => {
                  if (errRun) {
                    callback(errRun)
                  }
                  if (index === contacts.length - 1) {
                    callback();
                  }
                })
              }
          })
        }
      })
    })
  }

  static seedGroup(file ,callback) {
    readData.readData(file, (err, groups) => {
      db.serialize((errSer) => {
        if (errSer) {
          callback(errSer)
        } else {
          groups = groups.slice(0, -1);
          groups.forEach( (c, index) => {
            if (index > 0) {
              db.run(`
                INSERT INTO groups
                (name)
                VALUES
                ("${c[0]}");
                `, (err) => {
                  if (err) {
                    callback(err)
                  }
                  if (index === groups.length - 1) {
                    callback();
                  }
                })
            }
          })
        }
      })
    })
  }

  static seedGroupContact(file ,callback) {
    readData.readData(file, (err, groupContacts) => {
      db.serialize((errSer) => {
        if (errSer) {
          callback(errSer)
        } else {
          groupContacts = groupContacts.slice(0, -1);
          groupContacts.forEach( (c, index) => {
            if (index > 0) {
              db.run(`
                INSERT INTO groupContacts
                (contactId, groupId)
                VALUES
                (${c[0]}, ${c[1]});
                `, (err) => {
                  if (err) {
                    callback(err)
                  }
                  if (index === groupContacts.length - 1) {
                    callback();
                  }
                })
            }
          })
        }
      })
    })
  }

}


seedData.seedContact('./dummyContacts.csv', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`success`);
  }
})

seedData.seedGroup('./dummyGroups.csv', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`success`);
  }
})

seedData.seedGroupContact('./dummyGroupContacts.csv', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`success`);
  }
})
