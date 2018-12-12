const db = require('../db/connection');
const GroupContact = require('../models/groupContact');
const Group = require('../models/group');
class Contact {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.company = obj.company;
    this.phoneNumber = obj.phoneNumber;
    this.email = obj.email;
  }

  static listContact(callback) {
    const query = `
      SELECT
        *
      FROM
        contacts;
    `;
    db.all(query, (err, contacts) => {
      if (err) {
        callback(err, null);
      } else {
        let dataContacts = [];
        contacts.forEach( c => {
          dataContacts.push(new Contact(c));
        })
        callback(null, dataContacts);
      }
    })
  }

  static addContact(data, callback) {
    let newData = {
      name : data[0],
      company : data[1],
      phoneNumber : data[2],
      email : data[3]
    };
    let newContact = new Contact(newData);
    newContact.save((err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
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
        contacts
      WHERE
        ${whereValue}
    `;

    db.all(query, (err, contacts) => {
      if (err) {
        callback(err, null);
      } else {
        let dataContacts = [];
        contacts.forEach( c => {
          dataContacts.push(new Contact(c));
        })
        callback(null, dataContacts);
      }
    })
  }

  static updateContact(data, callback) {
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
      UPDATE contacts
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

  static deleteContact(data, callback) {
    let email = data[0];
    const qContact = `
      DELETE
      FROM contacts
      WHERE
        email = "${email}";
    `;
    db.serialize((err) => {
      Contact.findByOne(["email", email], (errFind, contacts) => {
        if (errFind) {
          callback(errFind);
        } else {
          if (contacts.length) {
            GroupContact.deleteGroupContact(["contactId", contacts[0].id], (errGC) => {
              if (errGC) {
                callback(errGC);
              }
            })
            db.run(qContact, function (err) {
              if (err) {
                callback(err);
              } else {
                callback(null);
              }
            })
          } else {
            callback('Email Tidak ditemukan');
          }
        }
      })
    })
  }

  static assignContact (data, callback) {
    let email = data[0];
    let groupName = data[1];
    Contact.findByOne(['email', email], (errContact, contacts) => {
      if (errContact) {
        callback(errContact)
      } else {
        if (contacts.length) {
          Group.findByOne(['name', groupName], (errGroup, groups) => {
            if (errGroup) {
              callback(errGroup);
            } else {
              if (groups.length) {
                GroupContact.addGroupContact([contacts[0].id, groups[0].id], (errAdd) => {
                  if (errAdd) {
                    callback(errAdd);
                  } else {
                    callback();
                  }
                })
              } else {
                callback(`Wrong group name!`)
              }
            }
          })
        } else {
          callback(`Wrong email!`);
        }
      }
    })
  }

  static showContact(data, callback) {
    let email = data[0];
    Contact.findByOne(['email', email], (errContact, contacts) => {
      if (errContact) {
        callback(errContact, null)
      } else {
        if (contacts.length) {
          GroupContact.showGroup (contacts[0].id, (errGroup, groups) => {
            if (errGroup) {
              callback(errGroup, null)
            } else {
              let objContact = {
                name : contacts[0].name,
                company : contacts[0].company,
                phoneNumber : contacts[0].phoneNumber,
                email : contacts[0].email,
                groups : []
              }
              groups.forEach( g => {
                objContact.groups.push(g.groupName);
              })
              callback(null, objContact)
            }
          })
        } else {
          callback(`Wrong email!`, null);
        }
      }
    })
  }

  save(callback) {
    const query = `
      INSERT INTO contacts
        (name, company, phoneNumber, email)
      VALUES
        ("${this.name}", "${this.company}", "${this.phoneNumber}", "${this.email}");
    `;
    db.run(query, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  }
}

module.exports = Contact;
