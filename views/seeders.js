const db = require('./db') 
const fs = require('fs')
let qContact = `
  INSERT INTO contacts (name,company,phone,email)
  VALUES ()
`
function readData(path) {
  return fs.readFileSync(path, 'utf8').trim().split('\n').slice(1)
}

function seedData () {
  
}