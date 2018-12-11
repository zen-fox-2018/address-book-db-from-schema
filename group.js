const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db');

class Group {
  constructor(name){
    this.name = name;
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
                 FROM Groups;`
    db.all(query, function(errFindAll, data) {
      if (errFindAll) {
        callback(errFindALl,null);
      }
      else {
        callback(null, data);
      }
    })
  }

  static findWhere(parameter, value, callback){
    var query = `SELECT *
                 FROM Groups
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

  static update(id, name, callback){
    var query = `UPDATE Groups
                 SET
                  name = "${name}"
                 WHERE id = "${id}";`;
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
                 FROM Groups
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

module.exports = Group;
