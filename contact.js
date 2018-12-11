const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db');

class Contact {
  constructor(name, telephone, company, email){
    this.name = name;
    this.telephone = telephone;
    this.company = company;
    this.email = email;
  }

  create(callback){
    var create = `INSERT INTO Contacts
                  (name, telephone, company, email)
                  VALUES
                  ("${this.name}","${this.telephone}","${this.company}","${this.email}")`;
    db.run(create, function(errCreate, data) {
      if (errCreate) {
        callback(errCreate,null);
      }
      else {
        callback(null,data);
      }
    })
  }

  static findAll(){
    let query = `SELECT *
                 FROM Contacts;`
    db.all(query, function(errFindAll, data) {
      if (errFindAll) {
        callback(errFindAll,null);
      }
      else {
        callback(null, data);
      }
    })
  }

  static findWhere(parameter, value, callback){
    var query = `SELECT *
                 FROM Contacts
                 WHERE ${parameter} = "${value}"`;
    db.all(query, function(errFindWhere, data) {
      if (errFindWhere) {
        callback(errFindWhere,null);
      }
      else {
        callback(null, data);
      }
    })
  }

  static update(id, name, telephone, company, email, callback){
    var query = `UPDATE Contacts
                 SET
                  name = "${name}",
                  telephone = "${telephone}",
                  company = "${company}",
                  email = "${email}"
                 WHERE id = "${id}"`;
    db.all(query, function(errUpdate, data) {
      if (errUpdate) {
        callback(errUpdate, null);
      }
      else {
        callback(null, errUpdate);
      }
    })
  }

  static delete(parameter, value, callback){
    var query = `DELETE
                 FROM Contacts
                 WHERE ${parameter} = "${value}"`;
    db.all(query, function(errDelete, data) {
      if (errDelete) {
        callback(errDelete,null);
      }
      else {
        callback(null, data);
      }
    })
  }
}

module.exports = Contact;
