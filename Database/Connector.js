var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./Database/addressBook.db')

// console.log(db);

module.exports = db