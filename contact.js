const db = require('./database/connection.js');

class Contact{
  constructor(name, company, phone, email) {
    this.id = null;
    this.name = name;
    this.company = company;
    this.phone = phone;
    this.email = email;
  }

  create(callback) {
    let query = `INSERT INTO contacts(name, company, phone, email)
                VALUES("${this.name}", "${this.company}", ${this.phone}, "${this.email}"`;
    db.run(query, (err) => {
      if (err) {
        callback(err);
      } else {
        db.get(`SELECT id FROM contacts WHERE name = "${this.name}";`, (err, data) => {
          if (err) {
            callback(err);
          } else {
            this.id = data.id;
            callback(null, this.id);
          }
        });
      }
    });
  }

  update(callback) {
    let query = `UPDATE contacts
                 SET 
                  name = "${this.name}", 
                  company = "${this.company}", 
                  phone = ${this.phone}, 
                  email = " ${this.email}"
                 WHERE id = ${this.id};`;
    db.run(query, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    }) 
  }

  delete(callback) {
    let query = `DELETE FROM contacts
                 WHERE id = ${this.id};`;
    db.run(query, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    }) 
  }

  static showAll(callback) {
    let query = `SELECT name, company, phone, email, GROUP_CONCAT(g.name, ', ') as groups
                 FROM contacts
                 JOIN group_contacts gc ON gc.contactId = contacts.id
                 JOIN groups ON gc.groupId = groups.id
                 GROUP BY name, company, phone, email;`;
    db.all(query, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    }) 
  }
}

module.exports = Contact;