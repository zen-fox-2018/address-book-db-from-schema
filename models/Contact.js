const db = require('../db')
class Contact {
  constructor(input) {
    this.id = input.id
    this.name = input.name
    this.company = input.company
    this.phone = input.phone
    this.email = input.email
  }

  static runQue(query, cb) {
    db.run(query, (err) => {
      if(err) {
        cb(err)
      } else{
        cb(null)
      }
    })
  }
  
  save() {
    let query = `
      INSERT INTO contacts (name, company, phone, email)
      VALUES (?, ?, ?, ?)
    `
    
  }
}
module.exports = Contact