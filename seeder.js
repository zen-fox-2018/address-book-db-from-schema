const db = require('./db')
const fs = require('fs') 

function readData(path) {
  return fs.readFileSync(path, 'utf8').trim().split('\n').slice(1)
}

function seedData() {
  db.serialize((err) => {
    if(err) {
      console.log(`Error serializing data` , err)
    } else {
      let dataContact = readData('contact.csv')
      let dataGroup = readData('group.csv') 
      let dataConGroup = readData('contactGroup.csv')

      for (let i = 0; i < dataContact.length; i++) {
        let data = dataContact[i].split(',')
        let query =   `
          INSERT INTO contacts (name,company,phone,email)
          VALUES ("${data[0]}", "${data[1]}", "${data[2]}", "${data[3]}")
        `
        db.run(query, (err) =>{
          if(err) {
            console.log(err)
          } else {
            console.log(`Success insert data`)
          }
        })
      }

      for (let i = 0; i < dataGroup.length; i++) {
        let data = dataGroup[i].split(',')
        let query =   `
          INSERT INTO groups (name)
          VALUES ("${data[0]}")
        `
        db.run(query, (err) =>{
          if(err) {
            console.log(err)
          } else {
            console.log(`Success insert data`)
          }
        })
      }

      for (let i = 0; i < dataConGroup.length; i++) {
        let data = dataConGroup[i].split(',')
        let query =   `
          INSERT INTO contactgroups (contactId,groupId)
          VALUES (${data[0]}, ${data[1]})
        `
        db.run(query, (err) =>{
          if(err) {
            console.log(err)
          } else {
            console.log(`Success insert data`)
          }
        })
      }
    }
  })
}

seedData()